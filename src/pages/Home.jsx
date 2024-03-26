import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-5 mb-4 bg-body-tertiary border rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">ExpenseTracker</h1>
        <p className="col-md-8 fs-4">
          Expense Tracker simplifies the management of your finances by
          effortlessly monitoring and organizing your expenses, helping you stay
          on top of your spending habits.
        </p>
        <Link to="/login">
          <button className="btn btn-primary btn-lg">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
