
export default function AuthenticationHeader() {
    const retrievedUser = JSON.parse(localStorage.getItem('user'));
    if (retrievedUser && retrievedUser.token) {
        return { Authorization: 'Bearer ' + retrievedUser.token };
    } else {
        return {};
    }
}