import { useState, useEffect } from 'react';
import CategoryModal from '../components/CategoryModal';
import DeleteModal from '../components/Modal';
import { useAuth } from '../contexts/authProvider';

const url = 'http://localhost:3000/api/categories';

function getCategories(accessToken, setCategories) {
  fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => setCategories(data.categories));
}

function postCategory(token, category, setCategories) {
  console.log('entered postCategory() with ' + JSON.stringify(category));
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
      console.log(data);
      console.log(`created new item ${data}`);
      setCategories((prevCategories) => [...prevCategories, data]);
    });
}

function putCategory(token, category, setCategories) {
  console.log(`Entered putCategory() with item ${JSON.stringify(category)}`);
  const id = category.category_id;
  fetch(`${url}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
    .then((updatedCategory) => {
      console.log('successfully updated item');
      setCategories((prevCategories) =>
        prevCategories.map((item) =>
          item.category_id === updatedCategory.category_id
            ? updatedCategory
            : item
        )
      );
    });
}

function deleteCategory(token, id, setCategories) {
  console.log(`deleteing category with id: ${id}`);
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCategories((prevCategories) =>
        prevCategories.filter((item) => item.category_id !== id)
      );
      console.log('successfully deleted category');
    });
}

export default function Categories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openNewModal = () => {
    console.log(`entered openNewModal() with`);
    const newItem = {
      type: 'new',
    };
    setSelectedItem(newItem);
    setModalShow(true);
  };

  const openEditModal = (item) => {
    console.log(`entered openEditModal() with ${item}`);
    const newItem = {
      ...item,
      type: 'edit',
    };
    setSelectedItem(() => newItem);
    setModalShow(true);
  };

  const openDeleteModal = (item) => {
    console.log(`entered openDeleteModal() with item: ${JSON.stringify(item)}`);
    setSelectedItem(() => item);
    setDeleteModalShow(true);
  };

  const handleSubmit = (item) => {
    console.log(`entered handleSubmit() with ${JSON.stringify(item)}`);
    const { type } = item;
    if (type === 'new') {
      postCategory(token, formData, setCategories);
    } else if (type === 'edit') {
      const newItem = { ...item, ...formData };
      putCategory(token, newItem, setCategories);
    }
    setModalShow(false);
  };

  const handleDelete = (item) => {
    console.log(`entered handleDelete() with ${item.category_id}`);
    const id = item.category_id;
    deleteCategory(token, id, setCategories);
    setDeleteModalShow(false);
  };

  useEffect(() => {
    getCategories(token, setCategories);
    setLoading(true);
  }, []);

  if (!loading) {
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
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleChange={handleChange}
        handleSubmit={() => handleSubmit(selectedItem)}
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
