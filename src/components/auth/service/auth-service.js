import datingApp from "../../../api/dating-app"

const register = (data) => {
    return datingApp.post(`/registration`, data);
}

const login = (data) => {
    return datingApp.post('/auth', data)
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(data.data));
            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem('users');
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export default {
    register,
    login,
    logout,
    getCurrentUser
};