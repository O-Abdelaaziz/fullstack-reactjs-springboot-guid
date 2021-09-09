import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { email, required, validatePassword, validateUsername } from '../helper/validators';
import AuthenticationService from '../services/authentication.service';

class RegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            successful: false,
            message: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitFormHandler = this.onSubmitFormHandler.bind(this);
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSubmitFormHandler(event) {
        event.preventDefault();

        this.setState({
            successful: false,
            message: ''
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const username = this.state.username;
            const email = this.state.email;
            const password = this.state.password;

            AuthenticationService.register(
                username,
                email,
                password
            ).then(
                (response) => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const responseMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: responseMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.onSubmitFormHandler}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, validateUsername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, validatePassword]}
                                    />
                                </div>

                                <div className="form-group text-center mt-2">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group mt-2">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;
