'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
            // No associations needed for Admin model in this case
        }

        async comparePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }

    Admin.init({
        name: DataTypes.STRING,
        dob: DataTypes.DATE,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        position: DataTypes.STRING,
        password: DataTypes.STRING,
        sessionId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Admin',
        hooks: {
            beforeCreate: async (admin) => {
                if (admin.password) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            },
            beforeUpdate: async (admin) => {
                if (admin.password) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            }
        }
    });

    return Admin;
};