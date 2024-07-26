import {Container, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <Navbar bg="warning" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/admin">
          Pizza PaPaS to ADMIN
        </NavLink>
        <NavLink className="navbar-brand" to="/admin/dishes/add-dish">
         addDish
        </NavLink>
        <NavLink className="nav-link" to="/">
          home
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default Toolbar;