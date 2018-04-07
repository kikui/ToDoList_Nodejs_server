const db = require("../db")

const Todo = db.define('todos', {
    id: {
        primaryKey: true,
        type: db.Sequelize.DataTypes.UUIDV4,
        defaultValue: db.Sequelize.DataTypes.UUIDV4,
    },
    message: {
        type: db.Sequelize.STRING,
        defaultValue: "defaut value"
    },
    completion: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },
    updatedAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },
    user: {
        type: db.Sequelize.STRING
    },
    team: {
        type: db.Sequelize.STRING
    }
});

Todo.sync()

module.exports = Todo;