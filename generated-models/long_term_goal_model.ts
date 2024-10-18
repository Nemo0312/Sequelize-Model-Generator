import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Long_term_goal model
interface Long_term_goalAttributes {
    id: DataTypes.INTEGER;
    user_id: number;  // Foreign key to users table
    type: DataTypes.STRING;
    goal_weight: DataTypes.INTEGER;
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface Long_term_goalCreationAttributes extends Optional<Long_term_goalAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Long_term_goal
class Long_term_goal extends Model<Long_term_goalAttributes, Long_term_goalCreationAttributes> implements Long_term_goalAttributes {
    public id!: DataTypes.INTEGER;
    public user_id!: string;
    public type!: DataTypes.STRING;
    public goal_weight!: DataTypes.INTEGER;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Long_term_goal model
const initLong_term_goal = (sequelize: Sequelize) => {
    Long_term_goal.init({
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
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        goal_weight: {
            type: DataTypes.INTEGER,
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
        tableName: 'long_term_goals',
        modelName: 'Long_term_goal',
    });
    return Long_term_goal;
};

export { initLong_term_goal };
export default Long_term_goal;
