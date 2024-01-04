import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"

import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><i className="material-icons">work</i><b> SynthiLancer</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Anasayfa</Nav.Link>
                        <Nav.Link href="/profile">Profilim</Nav.Link>
                        <Nav.Link href="/dashboard">Kontrol Paneli</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}