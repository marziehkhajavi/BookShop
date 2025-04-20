const setCookie = async (token) => {
    document.cookie = await `token=${token}; max-age=${1 * 24 * 60 * 60}`;
};

export default setCookie;