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

const SignUpValidateForm = async (username, password, confirmPassword) => {
    const errors = {};
    if (!username & !password & !confirmPassword) {
        errors.emptyField = "مشخصات را کامل وارد کنید."
    } else if (!validateUsername(username)) {
        errors.username = "نام کاربری مناسب انتخاب کنید."
    } else if (!validatePassword(password)) {
        errors.password = "رمز عبور مناسب انتخاب کنید."
    } else if (password !== confirmPassword) {
        errors.confirmPassword = " رمز عبور و تکرار آن یکسان نیستند."
    }
    return errors;
};

const LoginValidateForm = async (username, password) => {
    const errors = {};
    if (!username & !password ) {
        errors.emptyField = "مشخصات را بطور کامل وارد کنید."
    } else if (!validateUsername(username)) {
        errors.username = "نام کاربری مناسب انتخاب کنید."
    } else if (!validatePassword(password)) {
        errors.password = "رمز عبور مناسب انتخاب کنید."
    }
    return errors;
};

const BookValidation = async (title, quantity, price) => {
    const errors = {};
    if (!title & !quantity & !price) {
        errors.emptyField = "مشخصات کتاب را به طور کامل وارد کنید.";
    } else if ( !title ) {
        errors.title = "نام کتاب را وارد کنید.";
    } else if ( !quantity ) {
        errors.quantity = "تعداد موجودی کتاب را وارد کنید.";
    } else if ( !price ) {
        errors.price = "قیمت کتاب را وارد کنید.";
    };
    return errors;
} 

export { SignUpValidateForm, LoginValidateForm, BookValidation };