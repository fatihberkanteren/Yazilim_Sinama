import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Jumbotron, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap'; // React Bootstrap kütüphanesini içe aktarın

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        }
    }

    componentDidMount() {

    }

    render() {
        const backgroundStyles = {
            position: 'relative',
            backgroundColor: '#f7f7f7',
            overflow: 'hidden',
        };

        const circle1Styles = {
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#3498db',
            transform: 'rotate(45deg)',
            zIndex: '-1',
        };

        const circle2Styles = {
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            backgroundColor: '#e74c3c',
            zIndex: '-1',
        };

        return (
            <div style={backgroundStyles}>
                <div style={circle1Styles}></div>
                <div style={circle2Styles}></div>
                <div style={{ padding: '50px 0' }}>
                    <Container>
                        <Container style={{ textAlign: "center", paddingTop: "50px" }}>
                            <h1 style={{ fontFamily: "Arial", fontSize: "3rem", color: "#333" }}>Welcome to SynthiLancer</h1>
                            <p style={{ fontStyle: "italic", color: "#666", marginBottom: "20px" }}>
                                Hayalinizdeki işi bulmanın en kolay yolu!
                            </p>
                            <Link to="/login">
                                <Button
                                    renderAs="button"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        backgroundColor: "#3498db",
                                        color: "white",
                                        boxShadow: "none",
                                        border: "none",
                                        fontWeight: "bold",
                                        fontSize: "1.1rem"
                                    }}
                                >
                                    <span>Giriş Yap</span>
                                </Button>
                            </Link>
                            <hr style={{ margin: "40px 0", borderColor: "#ccc" }} />
                            <h6 style={{ color: "#888", fontSize: "1.1rem" }}>
                                Hesabınız yok mu? <Link to="/register" style={{ color: "#3498db", textDecoration: "none" }}>Kayıt Olun</Link>
                            </h6>
                        </Container>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Row className="mb-5">
                            <Col md={8}>
                                <h2>Latest Jobs</h2>
                                <ul>
                                    <li>Web Developer Needed - Project X - Company Y</li>
                                    <li>Graphic Designer Wanted - Project Z - Company X</li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <h2>Top Freelancers</h2>
                                <ul>
                                    <li>John Doe - Web Development</li>
                                    <li>Jane Smith - Graphic Design</li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Featured Freelancer Profiles</h2>
                                <Row>
                                    <Col md={6}>
                                        <img src="https://picsum.photos/200/200" alt="Profile 1" />
                                        <h3>John Doe</h3>
                                        <p>Web Developer</p>
                                    </Col>
                                    <Col md={6}>
                                        <img src="https://picsum.photos/200/200" alt="Profile 1" />
                                        <h3>Jane Smith</h3>
                                        <p>Graphic Designer</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}


