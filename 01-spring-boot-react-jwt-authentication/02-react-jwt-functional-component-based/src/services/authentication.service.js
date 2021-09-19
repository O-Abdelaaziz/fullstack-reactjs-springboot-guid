import AxiosApi from "../helper/Api";


class AuthenticationService {

    login(username, password) {
        return AxiosApi.post('signin', {
            username,
            password,
        })
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    register(username, email, password) {
        return AxiosApi.post('signup', {
            username,
            email,
            password
        })
            .then((response) => {
                return (response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthenticationService();