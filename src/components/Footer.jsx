const date = new Date();

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
      <div
        className="text-center p-3"
        // style={{"background-color: rgba(0, 0, 0, 0.05);"
      >
        © {date.getFullYear()} Copyright:
        <a className="text-body" href="https://curtisrubeck.com/">
          CurtisRubeck.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
