import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Meal model
interface MealAttributes {
    id: number;  // Primary key
    name: DataTypes.STRING;
    recipe_id: DataTypes.INTEGER;
    user_id: number;  // Foreign key to users table
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface MealCreationAttributes extends Optional<MealAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Meal
class Meal extends Model<MealAttributes, MealCreationAttributes> implements MealAttributes {
    public id!: number;
    public name!: DataTypes.STRING;
    public recipe_id!: DataTypes.INTEGER;
    public user_id!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Meal model
const initMeal = (sequelize: Sequelize) => {
    Meal.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        recipe_id: {
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
        tableName: 'meals',
        modelName: 'Meal',
    });
    return Meal;
};

export { initMeal };
export default Meal;
