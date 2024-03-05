export default function NavButton({ children, handleClick, isSelected }) {
  return (
    <li className="nav-item">
      <button
        className={isSelected ? 'nav-link active' : 'nav-link'}
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
}
