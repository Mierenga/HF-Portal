(function() {
    "use strict";

    module.exports = function(sequelize, DataTypes) {

        return sequelize.define("fellows", {

            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            university: DataTypes.STRING,
            major: DataTypes.STRING,
            bio: DataTypes.TEXT,
            interests: DataTypes.TEXT,
            resume_file_path: DataTypes.STRING,
            image_url: DataTypes.STRING,
            website_url: DataTypes.STRING

        },{

            timestamps: false, // add updated_at and created_at
            paranoid: false // add deleted_at

        });

    };
}());
