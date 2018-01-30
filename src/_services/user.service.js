import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: username,
            password: password
        })
    };

    return fetch(`${JU_URL}/api/auth/login/`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(resp => {
            // login successful if there's a jwt token in the response
            if (resp && resp.key) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(resp.key));
            }

            return resp.key;
        })
        .then(token => {
            if (!token) {
                return Promise.reject("Failed to login");
            }

            const userRequestOptions = {
                method: 'GET',
                headers: authHeader()
            };

            return fetch(`${JU_URL}/api/auth/user/`, userRequestOptions)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(response.statusText);
                    }

                    return response.json();
                })
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));

                    return user;
                })
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}