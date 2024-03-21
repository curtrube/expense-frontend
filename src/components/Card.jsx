const Card = () => {
  <div className="card flex-row m-2" key={index}>
    <div className="card-body">
      <h5 className="card-title">{item.merchant}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">
        {item.category}
      </h6>
    </div>
    <div className="p-3">
      <p className="m-0">${item.amount}</p>
    </div>
  </div>;
};

export default Card;
