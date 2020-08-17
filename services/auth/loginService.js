const user = require("../../db/modals/user");

class Auth {
    static async findUser(email) {
        return await user.findOne({
            where: {
                email: email
            }
        });
    }
    static async createUser(body) {
        return await user.create({
            email: body.email,
            userName: body.userName,
            password: body.password
        });
    }
}
module.exports = Auth;