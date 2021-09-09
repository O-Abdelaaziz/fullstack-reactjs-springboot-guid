import AxiosApi from "../helper/api";
import AuthenticationHeader from "./authentication.header";

class AuthenticationUserService {

    getPublicContent() {
        return AxiosApi.get('all');
    }

    getUserContent() {
        return AxiosApi.get('user', { headers: AuthenticationHeader() });
    }

    getModeratorContent() {
        return AxiosApi.get('mod', { headers: AuthenticationHeader() });
    }

    getAdminModeratorContent() {
        return AxiosApi.get('admin', { headers: AuthenticationHeader() });
    }
}

export default new AuthenticationUserService();
