const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



class UserController {

    prisma = new PrismaClient();

    registerUser = (async (req, res) => {
        try {
            const {firstName, lastName, email, password} = req.body;

            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            const saltedPassword = await bcrypt.hash(password, salt);

            const user = await this.prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: saltedPassword,
                },
            });


            return res.status(200).json({
                data: user
            })
        } catch (e) {
            return res.status(403).json({
                message: "Usuario ta creado"
            })
        }
    });

    generateAccessToken = (user_id) =>  {
        return jwt.sign(user_id, "ESTOESUNSECRETOSECRETOSO", { expiresIn: '999999s' });
    }


    login = (async (req, res) => {
        const {email, password} = req.body;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = this.generateAccessToken({ username: user.id });
            res.status(200).json({data: user, token: token});
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    });

}

const userController = new UserController();

module.exports = {
    userController
}
