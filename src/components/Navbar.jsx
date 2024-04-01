import { useState } from 'react';
import { Container, Navbar as BsNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => {
    setExpanded(false); // Close the navbar when a link is clicked
  };

  return (
    <BsNavbar
      bg="light"
      expand="lg"
      expanded={expanded}
      onSelect={handleSelect}
    >
      <Container fluid>
        <BsNavbar.Brand as={Link} to="/dashboard">
          ExpenseTracker
        </BsNavbar.Brand>
        <BsNavbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : 'expanded')}
        />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as={Link} to="/categories" active>
              Categories
            </Nav.Link>
            <Nav.Link href="#" as={Link} to="/accounts">
              Accounts
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
