const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.PASS,
    {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
        operatorsAliases: {
            $notIn: Op.notIn,
            $ne: Op.ne,
            $eq: Op.eq,
            $in: Op.in,
            $or: Op.or,
            $like: Op.like,
        },
        logging: false,
    }
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { connect, sequelize };
