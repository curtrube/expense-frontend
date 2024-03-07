import { useState, useEffect } from 'react';
import NewCategoryModal from './NewCategoryModal';

const URL = 'http://localhost:3000/categories';

function getCategories(setCategories) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => setCategories(data.categories));
}

function postCategory(category) {
  fetch(URL, {
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
    .then((data) => console.log(data));
}

function deleteCategory(categoryId) {
  fetch(`${URL}/${categoryId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Form submitted`);
    postCategory(formData);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCategories(setCategories);
  }, [categories]);
  return (
    <>
      <NewCategoryModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="container">
        <div className="d-flex flex-column">
          {categories.map((item, index) => (
            <div className="card m-1" key={index}>
              <div className="card d-flex flex-row">
                <div className="card-body">{item.name}</div>
                <div className="p-2">
                  <button className="btn btn-outline-secondary m-1">
                    Edit
                  </button>
                  <button className="btn btn-outline-danger m-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
