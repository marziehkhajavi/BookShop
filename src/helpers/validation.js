const validateUsername = (username) => {
    const regex = /^[a-zA-Z\d_]{4,16}$/;
    const result = regex.test(username);
    return result;
};

const validatePassword = (password) => {
    const regex = /^.{4,20}$/;
    const result = regex.test(password);
    return result;
};

const validateForm = async (username, password, confirmPassword) => {
    const errors = {};
    if (!username || !password || !confirmPassword) {
        errors.emptyField = "مشخصات را بطور کامل وارد کنید."
    } else if (!validateUsername(username)) {
        errors.username = "نام کاربری مناسب انتخاب کنید."
    } else if (!validatePassword(password)) {
        errors.password = "رمز عبور مناسب انتخاب کنید."
    } else if (password !== confirmPassword) {
        errors.confirmPassword = " رمز عبور و تکرار آن یکسان نیستند."
    }
    return errors;
};

export default validateForm;