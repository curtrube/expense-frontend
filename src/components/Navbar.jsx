import { useState } from 'react';
import {
  Container,
  Navbar as BsNavbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, handleLogout }) => {
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
        <BsNavbar.Brand as={Link} to={isAuthenticated ? '/dashboard' : '/'}>
          ExpenseTracker
        </BsNavbar.Brand>
        {isAuthenticated && (
          <>
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
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </BsNavbar.Collapse>
          </>
        )}
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
