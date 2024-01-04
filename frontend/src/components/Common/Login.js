import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
        componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
        console.log(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "75vh",
                }}
            >
                <div
                    style={{
                        width: "400px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                    }}
                >
                    <Link to="/" style={{ marginBottom: "20px", color: "#333", fontSize: "18px", textDecoration: "none" }}>
                        <i className="material-icons left">keyboard_backspace</i>
                    </Link>
                    <div style={{ textAlign: "left", marginBottom: "20px" }}>
                        <h4><b>Login</b></h4>
                        <p className="grey-text text-darken-1" style={{ color: "#333" }}>
                            Don't have an account? <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>Register</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <label htmlFor="email">Email</label><br></br>
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
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
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="password">Password</label><br></br>
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
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
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    backgroundColor: "#2196f3",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px"
                                }}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
