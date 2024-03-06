import fnboLogo from '../assets/fnbo-logo.svg';

export default function AccountCard({ name, number, bank }) {
  return (
    <div className="card" style={{ width: '10rem' }}>
      <img src={fnboLogo} className="card-img-top img-thumbnail" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{number}</h6>
        <p className="card-text">{bank}</p>
        <a href="#" className="btn btn-outline-secondary">
          Edit
        </a>
      </div>
    </div>
  );
}
