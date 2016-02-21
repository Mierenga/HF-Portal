(function() {
    "use strict";

    module.exports = function(sequelize, DataTypes) {

        return sequelize.define("companies", {

            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            name: { type:DataTypes.STRING, default: "" },
            email: DataTypes.STRING,
            primary_contact: DataTypes.STRING,
            company_size: DataTypes.INTEGER,
            industry: DataTypes.STRING,
            bio: DataTypes.TEXT,
            founding_year: DataTypes.INTEGER,
            founders: DataTypes.STRING,
            website_url: DataTypes.STRING,
            linked_in_url: DataTypes.STRING,
            image_url: DataTypes.STRING,
            location: DataTypes.STRING

        },{

            timestamps: false, // add updated_at and created_at
            paranoid: false // add deleted_at

        });
    };
}());
