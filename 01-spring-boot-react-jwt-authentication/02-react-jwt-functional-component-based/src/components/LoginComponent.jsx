import React, { useRef, useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from '../helper/validators';
import authenticationService from '../services/authentication.service';

const LoginComponent = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const formRef = useRef();
    const checkBoxRef = useRef();

    const usernameChangeHandler=(event)=>{
        setUsername(event.target.value);
    }

    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        if(checkBoxRef.current.context._errors.length ===0){
            authenticationService.login(username, password).then(
                () => {
                  //props.history.push("/profile");
                  window.location.reload();
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  setIsLoading(false);
                  setMessage(resMessage);
                }
              );
            } else {
                setIsLoading(false);
            }
    }

    return  (
        <div className="col-md-12">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
    
            <Form onSubmit={submitHandler} ref={formRef}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={usernameChangeHandler}
                  validations={[required]}
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
                  validations={[required]}
                />
              </div>
    
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
    
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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

export default LoginComponent
