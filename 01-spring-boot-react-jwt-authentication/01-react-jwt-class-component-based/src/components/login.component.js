import React, { Component } from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from "react-validation/build/button";
import { required } from '../helper/validators';
import AuthenticationService from '../services/authentication.service';
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        }

        this.onChangeUsernameHandler = this.onChangeUsernameHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
        this.onSubmitFormHandler = this.onSubmitFormHandler.bind(this);
    }

    onChangeUsernameHandler(event) {
        this.setState({ username: event.target.value });
    }

    onChangePasswordHandler(event) {
        this.setState({ password: event.target.value });
    }

    onSubmitFormHandler(event) {
        event.preventDefault();

        this.setState({
            loading: true,
            message: ''
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const username = this.state.username;
            const password = this.state.password;
            AuthenticationService.login(username, password)
                .then(() => {
                    console.log("login successfully!");
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                    (error) => {
                        const responseMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        this.setState({
                            loading: false,
                            message: responseMessage
                        });
                    }
                );
        } else {
            this.setState({
                loading: false
            });
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

                    <Form onSubmit={this.onSubmitFormHandler} ref={c => { this.form = c }}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <Input id="username" type="text" className="form-control" name="username" value={this.state.username} onChange={this.onChangeUsernameHandler} validations={[required]} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangePasswordHandler} validations={[required]} />
                        </div>

                        <div className="form-group text-center mt-2">
                            <button className="btn btn-primary btn-block"
                                disabled={this.state.loading}>
                                {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                                <span>Login</span>
                            </button>
                        </div>

                        <div className="form-group text-center mt-2">
                            <Link className="text text-primary" to="/register" role="button"> or Signup</Link>
                        </div>

                        {this.state.message && <div className="form-group mt-3">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>}

                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
