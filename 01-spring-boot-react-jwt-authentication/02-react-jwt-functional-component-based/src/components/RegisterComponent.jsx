import React, { useRef, useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, validateEmail, validatePassword, validateUsername } from '../helper/validators';
import authenticationService from '../services/authentication.service';

const RegisterComponent = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const formRef = useRef();
    const checkBoxRef = useRef();
 

    const usernameChangeHandler=(event)=>{
        setUsername(event.target.value);
    }

    const emailChangeHandler=(event)=>{
        setEmail(event.target.value);
    }

    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        setMessage('');
        setSuccessful(false);

        formRef.current.validateAll();
    
        if (checkBoxRef.current.context._errors.length === 0) {
          authenticationService.register(username, email, password).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
              this.props.history.push("/login");
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);
              setSuccessful(false);
            }
          );
        }
      };

    return  (
        <div className="col-md-12">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
    
            <Form onSubmit={submitHandler} ref={formRef}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={usernameChangeHandler}
                      validations={[required, validateUsername]}
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={emailChangeHandler}
                      validations={[required, validateEmail]}
                    />
                  </div>
    
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={passwordChangeHandler}
                      validations={[required, validatePassword]}
                    />
                  </div>
    
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}
    
              {message && (
                <div className="form-group">
                  <div
                    className={ successful ? "alert alert-success" : "alert alert-danger" }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBoxRef} />
            </Form>
          </div>
        </div>
      );
}

export default RegisterComponent
