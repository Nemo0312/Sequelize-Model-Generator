import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the User_metric model
interface User_metricAttributes {
    id: DataTypes.INTEGER;
    user_id: number;  // Foreign key to users table
    date: DataTypes.DATE;
    weight: DataTypes.FLOAT;
    height: DataTypes.INTEGER;
    body_fat_percent: DataTypes.INTEGER;
    activity_level: DataTypes.STRING;
    diet_type: DataTypes.STRING;
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface User_metricCreationAttributes extends Optional<User_metricAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for User_metric
class User_metric extends Model<User_metricAttributes, User_metricCreationAttributes> implements User_metricAttributes {
    public id!: DataTypes.INTEGER;
    public user_id!: string;
    public date!: DataTypes.DATE;
    public weight!: DataTypes.FLOAT;
    public height!: DataTypes.INTEGER;
    public body_fat_percent!: DataTypes.INTEGER;
    public activity_level!: DataTypes.STRING;
    public diet_type!: DataTypes.STRING;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the User_metric model
const initUser_metric = (sequelize: Sequelize) => {
    User_metric.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.STRING.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        body_fat_percent: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        activity_level: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        diet_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        sequelize,
        tableName: 'user_metrics',
        modelName: 'User_metric',
    });
    return User_metric;
};

export { initUser_metric };
export default User_metric;
