import Cookies from "js-cookie";

const setCookie = (token, username) => {
    Cookies.set('token', token, {expires: 1});
    Cookies.set('username', username, {expires: 1});
};

const getToken = () => {
    return Cookies.get('token');
};

const getUsername = () => {
    return Cookies.get('username');
};

export { setCookie, getToken, getUsername };