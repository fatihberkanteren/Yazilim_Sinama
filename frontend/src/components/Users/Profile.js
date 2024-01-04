import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';

class Profile extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state =
        {
            userdetails: [],
            showform: false,
            editing: "",
            school: "",
            degree: "",
            startdate: new Date(),
            file: null
            // enddate: new Date(),
        };
        this.delEducation = this.delEducation.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.editEducationSubmit = this.editEducationSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

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

    delEducation(ed) {
        const { user } = this.props.auth;
        const idToRemove = ed._id;
        this.state.userdetails.education = this.state.userdetails.education.filter((item) => item._id !== idToRemove);
        axios
            .put('http://localhost:4000/user/edit_profile/' + user.id, this.state.userdetails)
            .then(response => {
                console.log(this.state.userdetails);
            })
            .catch(function (error) {
                console.log(error);
            })
        // to refresh
        window.location.reload();
    }

    editEducation(ed) {
        let show = !this.state.showform;
        this.setState({ showform: show });
        let editid = ed._id;
        this.setState({ editing: editid });
        console.log(this.state.showform);
        this.setState({ school: ed.school });
        this.setState({ degree: ed.degree });
        if (ed.startdate) {
            ed.startdate = ed.startdate.toString();
            ed.startdate = ed.startdate.substring(0, 10);
            this.setState({ startdate: ed.startdate });
        }
        if (ed.enddate) {
            ed.enddate = ed.enddate.toString();
            ed.enddate = ed.enddate.substring(0, 10);
            this.setState({ enddate: ed.enddate });
        }

        // to refresh
        // this.props.history.push('/profile');
    }

    onBack() {
        let show = !this.state.showform;
        this.setState({ showform: show });
        this.setState({ editing: "" });

        // to refresh
        window.location.reload();
    }

    editEducationSubmit(ed) {
        const { user } = this.props.auth;
        const idToChange = ed._id;
        this.setState({ editing: "" });
        const ind = this.state.userdetails.education.findIndex(x => x._id === idToChange)
        if (this.state.school !== "")
            this.state.userdetails.education[ind].school = this.state.school;
        if (this.state.degree !== "")
            this.state.userdetails.education[ind].degree = this.state.degree;
        this.state.userdetails.education[ind].startdate = this.state.startdate;
        if (this.state.enddate && new Date(this.state.enddate) <= new Date(this.state.startdate)) {
            alert("End date ahould be after start date.");
        }
        else {
            this.state.userdetails.education[ind].enddate = this.state.enddate;
            axios
                .put('http://localhost:4000/user/edit_profile/' + user.id, this.state.userdetails)
                .then(response => {
                    console.log(this.state.userdetails);
                })
                .catch(function (error) {
                    console.log(error);
                })
            // to refresh
        }
        let show = !this.state.showform;
        this.setState({ showform: show });
        // window.location.reload();
    }

    render() {
        const user = this.state.userdetails;
        const userRole = user.role;
        let UserDetails;
        if (userRole === 'applicant') {
            UserDetails = (
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
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
                        <br></br>
                        <br></br>
                        <li>Education:
                            <Tooltip title="Add Education" aria-label="added">
                                <Link style={{ color: '#009900', fontWeight: 'bold', textDecoration: 'none'}} to="/addeducation"><i className="material-icons"><h2> add</h2></i></Link>
                            </Tooltip>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {user.education.map(ed => (
                                    <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }} key={ed._id}>
                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                            <li>School: {ed.school}</li>
                                            <li>Degree: {ed.degree}</li>
                                            <li>Start date: {ed.startdate ? ed.startdate.toString().substring(0, 10) : "NA"}</li>
                                            <li>End date: {ed.enddate ? ed.enddate.toString().substring(0, 10) : "NA"}</li>
                                            <div>
                                                {!this.state.showform || ed._id !== this.state.editing ? (
                                                    <div>
                                                        <Tooltip title="Delete Above Education" aria-label="delete">
                                                            <button
                                                                style={{ color: "#FF0000", border: 'none', background: 'none', cursor: 'pointer' }}
                                                                onClick={() => this.delEducation(ed)}
                                                            >
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="Edit Above Education" aria-label="edit">
                                                            <button
                                                                style={{ color: "#0000FF", border: 'none', background: 'none', cursor: 'pointer' }}
                                                                onClick={() => this.editEducation(ed)}
                                                            >
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <br></br>
                                                        <form noValidate onSubmit={this.onSubmit}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <button
                                                                    style={{
                                                                        color: "#0000FF",
                                                                        borderRadius: "3px",
                                                                        letterSpacing: "1.5px",
                                                                        marginTop: "1rem",
                                                                        backgroundColor: "#FFFFFF",
                                                                        padding: "8px 16px",
                                                                        border: "1px solid #0000FF",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => this.onBack()}
                                                                >
                                                                    <b>Back</b>
                                                                </button>
                                                                <button
                                                                    style={{
                                                                        color: "#FFFFFF",
                                                                        borderRadius: "3px",
                                                                        letterSpacing: "1.5px",
                                                                        marginTop: "1rem",
                                                                        backgroundColor: "#009900",
                                                                        padding: "8px 16px",
                                                                        border: "none",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => this.editEducationSubmit(ed)}
                                                                >
                                                                    <b>Save</b>
                                                                </button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                )}
                                            </div>
                                            <br></br>
                                        </ul>
                                    </li>
                                ))}
                            </ul>

                        </li>
                    </ul>
                </div>
            );
        }
        // ... (remaining code)
        return (
            <div style={{ height: "75vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 center-align">
                            <Card style={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Card.Header style={{ background: '#f5f5f5', borderBottom: '1px solid #ccc', borderRadius: '8px 8px 0 0' }}>
                                    <Button variant="light" style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', border: 'none', outline: 'none' }}><h4>My Profile</h4></Button>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <p style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                                            <b>{user.name}: </b>
                                            <Tooltip title="Edit Profile" aria-label="edit">
                                                <Link to="/editprofile" style={{ textDecoration: 'none' }}><i className="material-icons" style={{ fontSize: '1.5rem', color: '#009900', marginLeft: '10px' }}>edit</i></Link>
                                            </Tooltip>
                                        </p>
                                    </Card.Title>
                                    <Card.Text>
                                        {UserDetails}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
)(Profile);