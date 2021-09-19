import AxiosApi from "../helper/Api";
import AuthenticationHeader from "./authentication.header";

class AuthenticationUserService {

    getPublicContent() {
        return AxiosApi.get('test/all');
    }

    getUserContent() {
        return AxiosApi.get('test/user', { headers: AuthenticationHeader() });
    }

    getModeratorContent() {
        return AxiosApi.get('test/mod', { headers: AuthenticationHeader() });
    }

    getAdminModeratorContent() {
        return AxiosApi.get('test/admin', { headers: AuthenticationHeader() });
    }
}

export default new AuthenticationUserService();
