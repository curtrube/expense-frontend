import NavButton from './NavButton';

export default function Navbar({handleSelect}) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Expense Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavButton handleClick={() => handleSelect('transactions')}>Transactions</NavButton>
            <NavButton handleClick={() => handleSelect('categories')}>Categories</NavButton>
            <NavButton handleClick={() => handleSelect('accounts')}>Accounts</NavButton>
            <NavButton handleClick={() => handleSelect('about')}>About</NavButton>
          </ul>
        </div>
      </div>
    </nav>
  );
}
