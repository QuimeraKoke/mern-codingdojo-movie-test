const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');


function authenticateToken(req, res, next) {
    prisma = new PrismaClient();
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "ESTOESUNSECRETOSECRETOSO", async (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = await prisma.user.findUnique({
            where: {
                id: user.username,
            },
        });
            next()
    });
}

module.exports = {
    authenticateToken
}