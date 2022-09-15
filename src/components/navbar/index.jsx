import React from "react";
import { useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import logo from './superkiwi.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navegador() {

    const navigate = useNavigate()

    function handleClick() {
        sessionStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="/home">
                        <img className="logo" src={logo} alt='Logo' role="button" href='/home' />
                        <b>Inventario Superkiwi</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '150px' }}
                            navbarScroll
                        >   
                            <b><Nav.Link eventKey='/usuarios' href="/usuarios">Usuarios</Nav.Link></b>
                            <b><Nav.Link eventKey='/equipos' href="/equipos">Equipos</Nav.Link></b>
                            <b><Nav.Link eventKey='/prestamos' href="/prestamos">Prestamos</Nav.Link></b>
                        </Nav>
                        <Form className="d-flex justify-content-*-center">
                            {/* <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Buscar</Button> */}
                            <Button variant="danger" onClick={handleClick}>Salir</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}

