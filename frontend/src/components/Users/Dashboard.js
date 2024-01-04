import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            userdetails: [],

        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    // jobControl(){
    //     axios.get('http://localhost:4000//job-control/' + user.email)
    //     .then(response => {
    //         console.log(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/user/' + user.id)
        .then(response => {
            this.setState({ userdetails: response.data });
           

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const { user } = this.props.auth;
        let UserOptions;
        if (this.state.userdetails.role === "applicant") {
            UserOptions =
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <li style={{ marginBottom: '10px' }}>
                        <a
                            href="/profile"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'} // Mouse üzerine gelindiğinde rengi değiştirelim
                            onMouseOut={e => e.target.style.color = 'black'}
                        >Profilim</a>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <a
                            href="/jobsList"
                            style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'} // Mouse üzerine gelindiğinde rengi değiştirelim
                            onMouseOut={e => e.target.style.color = 'black'} // Mouse çekildiğinde orijinal rengine döndürelim
                        >İşleri Görüntüle</a>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <a
                            href="/myApplications"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s', // Geçiş efekti ekleyelim
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'} // Mouse üzerine gelindiğinde rengi değiştirelim
                            onMouseOut={e => e.target.style.color = 'black'} // Mouse çekildiğinde orijinal rengine döndürelim
                        >
                            Başvurularım
                        </a>
                    </li>
                </ul>
        }
        else if (this.state.userdetails.role === "recruiter") {
            UserOptions =
                <ul style={{ listStyleType: 'none' }}>
                    <li style={{ marginBottom: '10px' }}>
                        <a href="/profile"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'}
                            onMouseOut={e => e.target.style.color = 'black'}

                        >Profilim</a>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <a href="/addJob"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'}
                            onMouseOut={e => e.target.style.color = 'black'}

                        >İş Ekle</a>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <a href="/viewMyActiveJobs"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'}
                            onMouseOut={e => e.target.style.color = 'black'}
                        >İşerimi Listele</a>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <a href="/employees"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={e => e.target.style.color = 'blue'}
                            onMouseOut={e => e.target.style.color = 'black'}>Müşteriler</a>
                    </li>
                </ul>
        }
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">

                        <h6>
                        </h6>
                        <Card style={{ width: '100%' }}>
                            <Card.Header>
                                <h4>
                                    <b>Hey {user.name.split(" ")[0]} !</b>
                                </h4>
                                <div className="text-right">
                                    <p>Balance : {this.state.userdetails.balance} TL</p>
                                </div>

                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <p className="flow-text grey-text text-darken-1">
                                        Aradığınız işi bulmak için doğru yerdesiniz : {" "}
                                        <span style={{ fontFamily: "monospace" }}><b>SynthiLancer</b></span>
                                    </p>
                                </Card.Title>
                                <Card.Text>
                                    {UserOptions}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <br></br>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginRight: "1rem" // Sağa yaslama için marginRight kullanın
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);