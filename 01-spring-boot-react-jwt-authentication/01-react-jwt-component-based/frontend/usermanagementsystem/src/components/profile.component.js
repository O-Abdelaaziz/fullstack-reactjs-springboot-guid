import React, { Component, Fragment } from 'react'
import AuthenticationService from '../services/authentication.service';
class ProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthenticationService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Fragment>

                <div class="jumbotron">
                    <h1 class="display-4">Hello, <strong>{currentUser.username}</strong> to your profile</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p class="lead">
                        <strong>Token:</strong>{" "}
                        {currentUser.token.substring(0, 20)} ...{" "}
                        {currentUser.token.substr(currentUser.token.length - 20)}
                    </p>
                    <hr class="my-4" />
                    <p>
                        <strong>Id:</strong>{" "}
                        {currentUser.uid}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
            </Fragment>
        );
    }
}

export default ProfileComponent;
