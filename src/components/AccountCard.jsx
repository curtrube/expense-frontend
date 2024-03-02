import fnboLogo from '../assets/fnbo-logo.svg'

export default function AccountCard() {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={fnboLogo} className="card-img-top img-thumbnail" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Savings Account</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">1234567890</h6>
        <p className="card-text">First National Bank of Omaha</p>
        <a href="#" className="btn btn-outline-secondary">
          Edit
        </a>
      </div>
    </div>
  );
}
