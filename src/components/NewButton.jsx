export default function NewButton({ handleClick }) {
  return (
    <>
      <button onClick={handleClick} className="btn btn-success">
        New
      </button>
    </>
  );
}
