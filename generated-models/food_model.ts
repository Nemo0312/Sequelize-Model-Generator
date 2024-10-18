import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Food model
interface FoodAttributes {
    id: number;  // Primary key
    name: DataTypes.STRING;
    calories: DataTypes.INTEGER;
    carbs: DataTypes.INTEGER;
    protein: DataTypes.INTEGER;
    fat: DataTypes.INTEGER;
    vit_d: DataTypes.FLOAT;
    vit_c: DataTypes.FLOAT;
    iron: DataTypes.FLOAT;
    calcium: DataTypes.FLOAT;
    magnesium: DataTypes.FLOAT;
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface FoodCreationAttributes extends Optional<FoodAttributes, 'created_at' | 'updated_at'> {}

// Extend Sequelize's Model class for Food
class Food extends Model<FoodAttributes, FoodCreationAttributes> implements FoodAttributes {
    public id!: number;
    public name!: DataTypes.STRING;
    public calories!: DataTypes.INTEGER;
    public carbs!: DataTypes.INTEGER;
    public protein!: DataTypes.INTEGER;
    public fat!: DataTypes.INTEGER;
    public vit_d!: DataTypes.FLOAT;
    public vit_c!: DataTypes.FLOAT;
    public iron!: DataTypes.FLOAT;
    public calcium!: DataTypes.FLOAT;
    public magnesium!: DataTypes.FLOAT;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the Food model
const initFood = (sequelize: Sequelize) => {
    Food.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vit_d: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        vit_c: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        iron: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        calcium: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        magnesium: {
            type: DataTypes.FLOAT,
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
        tableName: 'foods',
        modelName: 'Food',
    });
    return Food;
};

export { initFood };
export default Food;
