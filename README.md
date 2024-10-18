# Sequelize-Model-Generator
A simple python script that will create Sequelize Models in TypeScript
```markdown
# Sequelize Model Generator Script

This Python script generates a Sequelize model in TypeScript with snake_case field names. It prompts the user for model attributes, handles foreign key relations, and includes a revert option to correct the last input.

## Features

- **Snake_case field names**: Automatically converts all field names to snake_case format.
- **Foreign Key Support**: Allows setting foreign keys with reference tables.
- **Primary Key Support**: Enables marking fields as primary keys.
- **Revert Option**: Use `/rev` to remove the last input if a mistake was made.
- **Auto-generated Timestamps**: Automatically includes `created_at` and `updated_at` fields.
- **Customizable Data Types**: Supports various Sequelize data types (`int`, `float`, `double`, `string`, `date`, and `boolean`).

## Installation

1. Clone this repository or download the script:

```bash
git clone https://github.com/Nemo0312/Sequelize-Model-Generator.git
cd sequelize-model-generator
```

2. Make sure you have Python installed on your machine. If not, install Python from [here](https://www.python.org/downloads/).

3. Install any required dependencies (although this script does not have any external dependencies, you can add virtualenv to manage Python environments if necessary).

```bash
pip install virtualenv
virtualenv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

## Usage

1. Run the script:

```bash
python generate_model.py
```

2. Follow the prompts to enter the model name and field attributes.

   - Enter fields in the format: `{NAME}:{DATATYPE}->{REFERENCE TABLE}:{REFERENCE KEY}` for foreign keys, or `{NAME}:{DATATYPE} -p` for primary keys.
   - Type `/rev` to remove the last entry and correct it if needed.
   - Type `done` when you are finished entering fields.

### Example Input

```bash
Enter the model name: UserMeal
Field: mealId:int -p
Field: name:string
Field: createdBy:int->User:id
Field: calories:float
Field: /rev
Removed the last entry: created_by
Field: created_by:int->User:id
Field: done
```

### Example Output

### Example Output

The generated file, `{model_name}.ts`, will contain:

```typescript
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ReferenceModel } from './referenceModel';  // Assuming the referenced model is in the same directory

// Define the attributes for the {ModelName} model
interface {ModelName}Attributes {
    {primary_key}: number;
    {field_name_1}: {data_type_1};
    {field_name_2}: {data_type_2};  // Foreign key to ReferenceModel
    {optional_field_name}?: {data_type_3};  // Optional field
    created_at?: Date;
    updated_at?: Date;
}

// Some fields are optional during creation
interface {ModelName}CreationAttributes extends Optional<{ModelName}Attributes, 'created_at' | 'updated_at' | '{optional_field_name}'> {}

// Extend Sequelize's Model class for {ModelName}
class {ModelName} extends Model<{ModelName}Attributes, {ModelName}CreationAttributes> implements {ModelName}Attributes {
    public {primary_key}!: number;
    public {field_name_1}!: {data_type_1};
    public {field_name_2}!: {data_type_2};  // Foreign key
    public {optional_field_name}?: {data_type_3};
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

// Function to initialize the {ModelName} model
const init{ModelName} = (sequelize: Sequelize) => {
    {ModelName}.init({
        {primary_key}: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        {field_name_1}: {
            type: DataTypes.{sequelize_data_type_1},
            allowNull: false,
        },
        {field_name_2}: {
            type: DataTypes.{sequelize_data_type_2},
            allowNull: false,
            references: {
                model: ReferenceModel,
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        {optional_field_name}: {
            type: DataTypes.{sequelize_data_type_3},
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
        tableName: '{model_name}s',
        modelName: '{ModelName}',
    });

    return {ModelName};
};

export { init{ModelName} };
export default {ModelName};
```

## Data Types

The script currently supports the following Sequelize data types:

- `int` -> `DataTypes.INTEGER`
- `float` -> `DataTypes.FLOAT`
- `double` -> `DataTypes.DOUBLE`
- `string` -> `DataTypes.STRING`
- `date` -> `DataTypes.DATE`
- `boolean` -> `DataTypes.BOOLEAN`

## Important
-This will only create a Rough draft of the model and you will most likley have to edit a few lines to make it fit your use case.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
