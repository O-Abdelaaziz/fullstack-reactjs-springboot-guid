
export default function AuthenticationHeader() {
    const retrievedUser = JSON.parse(localStorage.getItem('user'));
    if (retrievedUser && retrievedUser.accessToken) {
        return { Authorization: 'Bearer ' + retrievedUser.accessToken };
    } else {
        return {};
    }
}