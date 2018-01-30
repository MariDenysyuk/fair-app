export function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));

    if (token) {
        return { 'Authorization': 'Token ' + token };
    } else {
        return {};
    }
}