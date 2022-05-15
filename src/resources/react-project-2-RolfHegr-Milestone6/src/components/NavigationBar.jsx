import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import "../css/Nav.css";
import oinkLogo from "../resources/pigicon.png";

export default function NavigationBar() {
  const { activeUser, handleLogOut } = useAuthContext();

  function handleLogout() {
    handleLogOut();
  }

  return (
    <Navbar className="c-o-navbar">
      <Container className="c-nav">
        <Navbar.Brand href="/">
          OINKer<img className="mx-2 mb-2" alt="pig icon" src={oinkLogo}></img>
        </Navbar.Brand>
        <Nav className="me-auto">
          <div className="d-flex">
            {activeUser && (
              <>
                <Nav.Link to="/home" as={NavLink}>
                  Home
                </Nav.Link>
                <Nav.Link to="/profile" as={NavLink}>
                  Profile
                </Nav.Link>
                <Nav.Link to="/uploadImage" as={NavLink}>
                  Upload Photo
                </Nav.Link>
              </>
            )}
          </div>
          <div className="d-fnplex">
            {!activeUser && (
              <Nav.Link to="/login" as={NavLink}>
                Login / Create User
              </Nav.Link>
            )}
            {activeUser && (
              <Nav.Link onClick={handleLogout} href="/">
                LogOut
              </Nav.Link>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
