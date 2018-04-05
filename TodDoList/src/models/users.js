const db = require("../db")

const User = db.define('todos', {
    id: {
        primaryKey: true,
        type: db.Sequelize.DataTypes.UUIDV4,
        defaultValue: db.Sequelize.DataTypes.UUIDV4,
    },
    Pseudo: {
        type: db.Sequelize.STRING
    },
    PassWord: {
        type: db.Sequelize.STRING
    }
});

User.sync()

module.exports = User;