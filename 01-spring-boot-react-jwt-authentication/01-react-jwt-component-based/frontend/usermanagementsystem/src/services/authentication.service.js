import AxiosApi from "../helper/api";


class AuthenticationService {

    login(username, password) {
        return AxiosApi.post('signin', {
            username,
            password,
        })
            .then((response) => {
                if (response.data.accessToken) {
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
                console.log(response.data);
                return (JSON.stringify(response.data));
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