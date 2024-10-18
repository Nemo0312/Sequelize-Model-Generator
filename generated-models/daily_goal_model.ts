import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Daily_goal model
interface Daily_goalAttributes {
    id: number;  // Primary key
    user_id: number;  // Foreign key to users table
    metric: DataTypes.STRING;
    taget: DataTypes.INTEGER;
    type: DataTypes.BOOLEAN;
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface Daily_goalCreationAttributes extends Optional<Daily_goalAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Daily_goal
class Daily_goal extends Model<Daily_goalAttributes, Daily_goalCreationAttributes> implements Daily_goalAttributes {
    public id!: number;
    public user_id!: string;
    public metric!: DataTypes.STRING;
    public taget!: DataTypes.INTEGER;
    public type!: DataTypes.BOOLEAN;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Daily_goal model
const initDaily_goal = (sequelize: Sequelize) => {
    Daily_goal.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
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
        metric: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        taget: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        type: {
            type: DataTypes.BOOLEAN,
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
        tableName: 'daily_goals',
        modelName: 'Daily_goal',
    });
    return Daily_goal;
};

export { initDaily_goal };
export default Daily_goal;
