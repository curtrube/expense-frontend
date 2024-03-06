import { useState, useEffect } from 'react';

function getCategories(setCategories) {
  fetch('http://localhost:3000/categories')
    .then((response) => response.json())
    .then((data) => setCategories(data.categories));
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className="container">
      <div className="d-flex flex-column">
        {categories.map((item, index) => (
          <div className="card m-1" key={index}>
            <div className="card d-flex flex-row">
              <div className="card-body">{item.name}</div>
              <div className="p-2">
                <button className="btn btn-outline-secondary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
