import Cookies from "js-cookie";

const setCookie = async (token, username) => {
    await Cookies.set('token', token, {expires: 1});
    Cookies.set('username', username, {expires: 1});
};

const getToken = async () => {
    await Cookies.get('token');
};

const getUsername = async () => {
    await Cookies.get('username');
};

export { setCookie, getToken, getUsername };