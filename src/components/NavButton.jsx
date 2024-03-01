export default function NavButton({children, handleClick}) {
  return (
    <li className="nav-item">
        <button className="nav-link active" type="button" onClick={handleClick}>{children}</button>
    </li>
  );
}
