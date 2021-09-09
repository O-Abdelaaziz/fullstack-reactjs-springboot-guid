export const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger mt-2">This field is required!</div>
        );
    }
};