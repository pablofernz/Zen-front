const validate = (userData) => {
    const errors = {};

    if (!userData.email) {
        errors.email = "Must enter a email"
    } else {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
            errors.email = "Enter a valid email"
        }
    }

    if (!userData.password) {
        errors.password = "Password needed";
    } else {
        if (!/^.{8,}$/.test(userData.password)) {
            errors.password = "Must have 8 characters"
        }
    }
    return errors;
}

export default validate

// 