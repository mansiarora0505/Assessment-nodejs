const { sequelize } = require("./connection/connection");

sequelize.sync()
    .then(() => console.log("models created successfully"))
    .catch((error) => console.log(error.message));
