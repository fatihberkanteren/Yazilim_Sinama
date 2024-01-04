import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            role: "",
            phone_number: NaN,
            skills: [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ role: event.target.value });
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.skills);
        if (this.state.role === "applicant" && this.state.skills !== "" && this.state.skills.length !== 0)
            this.state.skills = this.state.skills.split(',');
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role,
            phone_number: this.state.phone_number,
            skills: this.state.skills
        };
        this.props.registerUser(newUser, this.props.history);
        console.log(newUser);
    };
    render() {
        const { errors } = this.state;
        const userRole = this.state.role;
        let RoleForm;

    
        if (userRole === 'applicant') {
            RoleForm =
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="skills">Yetenekler (virgül ile ayırın):</label><br />
                    <input
                        onChange={this.onChange}
                        value={this.state.skills}
                        placeholder="Enter skills"
                        id="skills"
                        type="text"
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                            outline: "none"
                        }}
                    />
                </div>
        } else if (userRole === 'recruiter') {
            RoleForm =
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="phone_number">Phone no.</label><br />
                    <input
                        onChange={this.onChange}
                        value={this.state.phone_number}
                        id="phone_number"
                        type="number"
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                            outline: "none"
                        }}
                    />
                </div>
        }
    
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fff" }}>
                    <div style={{ textAlign: "center" }}>
                        <h4>
                            <b>Register</b>
                        </h4>
                        <p className="grey-text text-darken-1">
                            Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={this.onSubmit} className="register-form">
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="role">Role</label><br />
                            <select
                                value={this.state.role}
                                onChange={this.onChange}
                                id="role"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    outline: "none"
                                }}
                            >
                                <option value="">Aday/İşveren</option>
                                <option value="applicant">Aday</option>
                                <option value="recruiter">İşveren</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="name">Adınız</label><br />
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                id="name"
                                type="text"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="email">Email</label><br />
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                                type="email"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="password">Şifre</label><br />
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                id="password"
                                type="password"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    outline: "none"
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="password2">Şifreyi Doğrula</label><br />
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                id="password2"
                                type="password"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    outline: "none"
                                }}
                            />
                        </div>
                        {/* Diğer input alanları */}
                        <hr />
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            {RoleForm}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    backgroundColor: "#1565c0",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px",
                                    cursor: "pointer"
                                }}
                                type="submit"
                            >
                                Kayıt Ol
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }    
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));