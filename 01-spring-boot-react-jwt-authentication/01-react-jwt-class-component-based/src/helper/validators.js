import { isEmail } from "validator";

export const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger mt-2" role="alert">This field is required!</div>
        );
    }
};

export const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger mt-2" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

export const validateUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};


export const validatePassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};