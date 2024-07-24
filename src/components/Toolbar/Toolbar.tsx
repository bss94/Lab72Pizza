import {Container, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <Navbar bg="warning" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Pizza PaPaS
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default Toolbar;