const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.db, process.env.dbuserName, process.env.password, {
    host: "localhost",
    dialect: "mssql",
    define: {
        raw: true,
        freezeTableName: true
    },
    logging: false
});

const authentication = async () => {
    try {
        await sequelize.authenticate();
        console.log("connection is established successfully");
    }
    catch (error) {
        console.log(error.message)
    }

}
authentication();
module.exports.sequelize = sequelize;
module.exports.DataTypes = DataTypes;