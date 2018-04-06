const db = require("../db")

const User = db.define('users', {
    id: {
        primaryKey: true,
        type: db.Sequelize.DataTypes.UUIDV4,
        defaultValue: db.Sequelize.DataTypes.UUIDV4,
    },
    pseudo: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    team: {
        type: db.Sequelize.STRING
    }
});

User.sync()

module.exports = User;