const date = new Date();

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-body-tertiary text-center text-lg-start">
      <div className="text-center p-3">
        Copyright © {date.getFullYear() + ' '}
        <a className="text-body" href="https://curtisrubeck.com/">
          CurtisRubeck.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
