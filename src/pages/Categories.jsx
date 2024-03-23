import { useState, useEffect } from 'react';
import CategoryModal from '../components/CategoryModal';
import DeleteModal from '../components/Modal';

const url = 'http://localhost:3000/categories';

function getCategories(setCategories) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => setCategories(data.categories));
}

function postCategory(category, setCategories) {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      console.log(`Status Code: ${response.status}`);
      if (!response.ok) {
        throw new Error(`HTTP Error, status = ${response.status}`);
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      const newItem = data.categories[0];
      console.log(`created new item ${newItem}`);
      setCategories((prevCategories) => [...prevCategories, newItem]);
    });
}

function deleteCategory(categoryId, setCategories) {
  console.log(`deleteing category with id: ${categoryId}`);
  fetch(`${url}/${categoryId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(() => {
      setCategories((prevCategories) =>
        prevCategories.filter((item) => item.category_id !== categoryId)
      );
      console.log('successfully deleted category');
    });
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  // const [editData, setEditData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handle delete modal
  // const [deleteData, setDeleteData] = useState('');
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  // const handleDeleteClose = () => setDeleteShow(false);
  // const handleDeleteShow = () => setDeleteShow(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    postCategory(formData, setCategories);
    setEditModalShow(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openNewModal = () => {
    console.log(`entered openNewModal() with`);
    setSelectedItem(null);
    setEditModalShow(true);
  };

  const openEditModal = (item) => {
    console.log(`entered openEditModal() with ${item}`);
    const newItem = {
      ...item,
      type: 'edit',
    };
    setSelectedItem(() => newItem);
    setEditModalShow(true);
  };

  const openDeleteModal = (item) => {
    console.log(item);
    console.log(`entered openDeleteModal() with item: ${JSON.stringify(item)}`);
    setSelectedItem(() => item);
    setDeleteModalShow(true);
  };

  const handleDelete = (item) => {
    console.log(`entered handleDelete() with ${item.category_id}`);
    deleteCategory(item.category_id, setCategories);
    setDeleteModalShow(false);
  };

  useEffect(() => {
    getCategories(setCategories);
    setDataLoaded(true);
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button className="btn btn-primary" onClick={openNewModal}>
        New Category
      </button>

      {categories.map((item, index) => (
        <div className="card flex-row m-2" key={index}>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-subtitle mb-2 text-body-secondary">
              {item.description}
            </p>
          </div>
          <div className="p-3">
            <button
              className="btn btn-outline-secondary m-1"
              onClick={() => openEditModal(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger m-1"
              onClick={() => openDeleteModal(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <CategoryModal
        show={editModalShow}
        handleClose={() => setEditModalShow(false)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        {...selectedItem}
      />

      <DeleteModal
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        handleSubmit={() => handleDelete(selectedItem)}
        {...selectedItem}
      />
    </>
  );
}
