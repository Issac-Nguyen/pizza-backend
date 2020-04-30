class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.created_at = new Date().getTime();
    }
}

module.exports = User;