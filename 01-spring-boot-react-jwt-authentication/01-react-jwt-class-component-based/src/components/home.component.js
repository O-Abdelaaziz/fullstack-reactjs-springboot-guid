import React, { Component, Fragment } from 'react'
import AuthenticationUserService from '../services/authentication.user.service';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          content: ""
        };
      }
    
      componentDidMount() {
        AuthenticationUserService.getPublicContent().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            });
          }
        );
      }
    
      render() {
        return (
          <Fragment>
            <header className="jumbotron">
              <h3>{this.state.content}</h3>
            </header>
          </Fragment>
        );
      }
}

export default HomeComponent;
