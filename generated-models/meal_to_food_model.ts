import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Meal_to_food model
interface Meal_to_foodAttributes {
    id: DataTypes.INTEGER;
    food_id: number;  // Foreign key to food table
    meal_id: number;  // Foreign key to meal table
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface Meal_to_foodCreationAttributes extends Optional<Meal_to_foodAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Meal_to_food
class Meal_to_food extends Model<Meal_to_foodAttributes, Meal_to_foodCreationAttributes> implements Meal_to_foodAttributes {
    public id!: DataTypes.INTEGER;
    public food_id!: string;
    public meal_id!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Meal_to_food model
const initMeal_to_food = (sequelize: Sequelize) => {
    Meal_to_food.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        food_id: {
            type: DataTypes.STRING.UNSIGNED,
            allowNull: false,
            references: {
                model: 'food',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        meal_id: {
            type: DataTypes.STRING.UNSIGNED,
            allowNull: false,
            references: {
                model: 'meal',
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
        tableName: 'meal_to_foods',
        modelName: 'Meal_to_food',
    });
    return Meal_to_food;
};

export { initMeal_to_food };
export default Meal_to_food;
