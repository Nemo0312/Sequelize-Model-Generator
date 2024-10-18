import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Daily_goal_history model
interface Daily_goal_historyAttributes {
    id: DataTypes.INTEGER;
    user_id: number;  // Foreign key to users table
    daily_goal_id: number;  // Foreign key to daily_goal table
    date: DataTypes.DATE;
    is_achieved: DataTypes.BOOLEAN;
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface Daily_goal_historyCreationAttributes extends Optional<Daily_goal_historyAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Daily_goal_history
class Daily_goal_history extends Model<Daily_goal_historyAttributes, Daily_goal_historyCreationAttributes> implements Daily_goal_historyAttributes {
    public id!: DataTypes.INTEGER;
    public user_id!: string;
    public daily_goal_id!: string;
    public date!: DataTypes.DATE;
    public is_achieved!: DataTypes.BOOLEAN;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Daily_goal_history model
const initDaily_goal_history = (sequelize: Sequelize) => {
    Daily_goal_history.init({
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
        daily_goal_id: {
            type: DataTypes.STRING.UNSIGNED,
            allowNull: false,
            references: {
                model: 'daily_goal',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_achieved: {
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
        tableName: 'daily_goal_historys',
        modelName: 'Daily_goal_history',
    });
    return Daily_goal_history;
};

export { initDaily_goal_history };
export default Daily_goal_history;
