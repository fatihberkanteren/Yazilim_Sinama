import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            recruiter: [],
            recruiterName: "",
            title: "",
            titleError: "",
            description: "",
            type: "",
            typeError: "",
            duration: -1,
            durationError: "",
            durationstr: "",
            salary: -1,
            salaryError: "",
            posmax: 1,
            appmax: 10,
            appmaxError: "",
            numpos: 0,
            numapp: 0,
            app: 0,
            address: "",
            addressError: "",
            skills: [],
            skillstr: "",
            rating: 0,
            numrate: 0,
            dateOfPost: new Date(),
            // default 100 days from now
            deadline: new Date(new Date().getTime() + (100 * 24 * 60 * 60 * 1000)),
            deadlineError: "",
        }
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

    validate = () => {
        let titleError = "";
        let typeError = "";
        let durationError = "";
        let salaryError = "";
        let addressError = "";
        let deadlineError = "";
        let appmaxError = "";


        if (this.state.title === "") {
            titleError = "Title cannot be blank";
        }

        if (this.state.type === "") {
            typeError = "Select type of job";
        }

        if (this.state.duration === -1) {
            durationError = "Select duration of job";
        }

        if (this.state.salary === -1) {
            salaryError = "Enter Salary";
        }

        if (this.state.address === "") {
            addressError = "Address cannot be blank";
        }

        if (new Date(this.state.deadline) < new Date().getTime()) {
            deadlineError = "Deadline cannot be before tomorrow";
        }

        if (this.state.appmax < this.state.posmax) {
            appmaxError = "Maximum number of applications cannot be less than maximum number of positions.";
        }

        if (titleError || typeError || durationError || salaryError
            || addressError || deadlineError || appmaxError) {
            this.setState({ titleError, typeError, durationError, salaryError, addressError, deadlineError, appmaxError });
            return false;
        }

        return true;
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let euser = this.state;
        euser.skills = this.state.skillstr.split(',');
        if (euser.durationstr !== "") {
            euser.duration = parseInt(euser.durationstr);
        }

        const newJob = {
            recruiter: this.state.userdetails,
            recruiterName: this.state.userdetails.name,
            title: euser.title,
            description: euser.description,
            type: euser.type,
            duration: euser.duration,
            salary: euser.salary,
            posmax: euser.posmax,
            appmax: euser.appmax,
            numpos: euser.numpos,
            numapp: euser.numapp,
            app: euser.app,
            address: euser.address,
            skills: euser.skills,
            rating: euser.rating,
            numrate: euser.numrate,
            dateOfPost: euser.dateOfPost,
            deadline: euser.deadline,
        };
        const isValid = this.validate();
        if (isValid) {
            axios
                .post('http://localhost:4000/job/add_job', newJob)
                .then(response => {
                    console.log(newJob);
                    alert("Job added successfully!");
                    // to refresh
                    this.props.history.push("/viewMyActiveJobs");
                    this.props.history.push("/viewMyActiveJobs");
                    this.props.history.goBack();
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Job NOT added successfully!");
                })
        }
    };

    render() {
        const user = this.state;
        const userRole = this.state.userdetails.role;
        let AddJob;
        if (userRole === "recruiter") {
            AddJob =
                <form noValidate onSubmit={this.onSubmit} className="row">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="title">Başlık</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    id="title"
                                    type="text"
                                    className="validate"
                                />
                                <span className="red-text">{this.state.titleError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="description">Açıklama</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    id="description"
                                    type="text"
                                    className="validate"
                                />
                                {/* ... */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="type">Tip</label><br />
                                <select
                                    value={this.state.type}
                                    onChange={this.onChange}
                                    id="type"
                                    className="browser-default"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="fullTime">Full-time</option>
                                    <option value="partTime">Part-time</option>
                                    <option value="wfh">Uzaktan</option>
                                </select>
                                <span className="red-text">{this.state.typeError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="salary">Ücret</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.salary}
                                    id="salary"
                                    type="number"
                                    min="-1"
                                    className="validate"
                                />
                                <span className="red-text">{this.state.salaryError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="durationstr">Süre</label><br />
                                <select
                                    value={this.state.durationstr}
                                    onChange={this.onChange}
                                    id="durationstr"
                                    className="browser-default"
                                >
                                    <option value="">Süre Seçiniz</option>
                                    <option value="0">Süresiz</option>
                                    <option value="1">1 ay</option>
                                    <option value="2">2 ay</option>
                                    <option value="3">3 ay</option>
                                    <option value="4">4 ay</option>
                                    <option value="5">5 ay</option>
                                    <option value="6">6 ay</option>
                                </select>
                                <span className="red-text">{this.state.durationError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="posmax">Max. Başvuru Sayısı</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.posmax}
                                    id="posmax"
                                    type="number"
                                    min="0"
                                    className="validate"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="appmax">Max. İzin Verilen Uygulama Sayısı</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.appmax}
                                    id="appmax"
                                    type="number"
                                    min="0"
                                    className="validate"
                                />
                                <span className="red-text">{this.state.appmaxError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="address">Adres</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    id="address"
                                    type="text"
                                    className="validate"
                                />
                                <span className="red-text">{this.state.addressError}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="skillstr">Yetenekler</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.skillstr}
                                    id="skillstr"
                                    type="text"
                                    className="validate"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="deadline">Deadline (default: 100 days from now)</label><br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.deadline}
                                    id="deadline"
                                    type="date"
                                    className="validate"
                                />
                                <span className="red-text">{this.state.deadlineError}</span>
                            </div>
                        </div>


                    </div>


                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            İşi Ekle
                        </button>
                    </div>

                </form>
        }

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {AddJob}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

CreateJob.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(CreateJob);