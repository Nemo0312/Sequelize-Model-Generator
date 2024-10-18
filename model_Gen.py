import re
import os

# Map user input to Sequelize data types
sequelize_data_types = {
    'int': 'DataTypes.INTEGER',
    'float': 'DataTypes.FLOAT',
    'double': 'DataTypes.DOUBLE',
    'string': 'DataTypes.STRING',
    'date': 'DataTypes.DATE',
    'boolean': 'DataTypes.BOOLEAN'
}

def to_snake_case(name):
    """Convert a string to snake_case."""
    return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

def parse_field_input(field_input):
    # Split the input by ':', the first part will always be the field name and datatype
    field_parts = field_input.split(":")
    
    if len(field_parts) < 2:
        raise ValueError("Invalid format. The correct format is {NAME}:{DATATYPE} or {NAME}:{DATATYPE}->{REFERENCE TABLE}:{REFERENCE NAME}")

    field_name = to_snake_case(field_parts[0])  # Convert to snake_case
    data_type = field_parts[1].split(" ")[0].upper()  # Get datatype

    # Check if it's a primary key
    is_primary_key = False
    if len(field_parts[1].split(" ")) > 1 and field_parts[1].split(" ")[1] == "-p":
        is_primary_key = True

    # Check if there is a foreign key relation
    reference_table = None
    reference_key = None
    if "->" in field_input:
        # Split by -> to get reference table and key
        ref_part = field_input.split("->")
        if len(ref_part) < 2:
            raise ValueError("Foreign key relation must be in the format {REFERENCE TABLE}:{REFERENCE NAME}")
        reference_table, reference_key = ref_part[1].split(":")
        reference_table = to_snake_case(reference_table)
        reference_key = to_snake_case(reference_key)

    return {
        'name': field_name,
        'data_type': data_type,
        'is_primary_key': is_primary_key,
        'reference_table': reference_table,
        'reference_key': reference_key
    }


def generate_model(model_name, fields):
    """Generate the Sequelize model code."""
    model_name = model_name.capitalize()  # Capitalize the model name
    model_code = f"import {{ DataTypes, Model, Optional, Sequelize }} from 'sequelize';\n"
    model_code += f"\n// Define the attributes for the {model_name} model"
    model_code += f"\ninterface {model_name}Attributes {{\n"

    for field in fields:
        field_name, data_type, reference_table, reference_key, is_primary = field
        if reference_table:
            model_code += f"    {field_name}: number;  // Foreign key to {reference_table} table\n"
        elif is_primary:
            model_code += f"    {field_name}: number;  // Primary key\n"
        else:
            model_code += f"    {field_name}: {data_type};\n"

    model_code += "    created_at?: Date;\n    updated_at?: Date;\n}\n\n"

    model_code += f"// Some fields are optional during creation\n"
    model_code += f"interface {model_name}CreationAttributes extends Optional<{model_name}Attributes, 'created_at' | 'updated_at'> {{}}\n\n"

    model_code += f"// Extend Sequelize's Model class for {model_name}\n"
    model_code += f"class {model_name} extends Model<{model_name}Attributes, {model_name}CreationAttributes> implements {model_name}Attributes {{\n"
    for field in fields:
        field_name, data_type, reference_table, reference_key, is_primary = field
        if reference_table:
            model_code += f"    public {field_name}!: number;\n"
        elif is_primary:
            model_code += f"    public {field_name}!: number;\n"
        else:
            model_code += f"    public {field_name}!: {data_type};\n"
    model_code += "    public readonly created_at!: Date;\n    public readonly updated_at!: Date;\n}\n\n"

    model_code += f"// Function to initialize the {model_name} model\n"
    model_code += f"const init{model_name} = (sequelize: Sequelize) => {{\n"
    model_code += f"    {model_name}.init({{\n"

    for field in fields:
        field_name, data_type, reference_table, reference_key, is_primary = field
        sequelize_type = sequelize_data_types.get(data_type, "DataTypes.STRING")
        if is_primary:
            model_code += f"        {field_name}: {{\n            type: {sequelize_type}.UNSIGNED,\n            autoIncrement: true,\n            primaryKey: true,\n        }},\n"
        elif reference_table:
            model_code += f"        {field_name}: {{\n            type: {sequelize_type}.UNSIGNED,\n            allowNull: false,\n            references: {{\n                model: '{reference_table}',\n                key: '{reference_key}',\n            }},\n            onDelete: 'CASCADE',\n            onUpdate: 'CASCADE',\n        }},\n"
        else:
            model_code += f"        {field_name}: {{\n            type: {sequelize_type},\n            allowNull: true,\n        }},\n"

    model_code += "        created_at: {\n            type: DataTypes.DATE,\n            allowNull: false,\n            defaultValue: DataTypes.NOW,\n        },\n"
    model_code += "        updated_at: {\n            type: DataTypes.DATE,\n            allowNull: false,\n            defaultValue: DataTypes.NOW,\n        }\n"
    model_code += f"    }}, {{\n        sequelize,\n        tableName: '{model_name.lower()}s',\n        modelName: '{model_name}',\n    }});\n"
    model_code += f"    return {model_name};\n}};\n\n"
    model_code += f"export {{ init{model_name} }};\nexport default {model_name};\n"

    return model_code

def main():
    print("Welcome to the Sequelize Model Generator Script!")
    
    # Get model name
    model_name = input("Enter the model name: ")

    # Collect field inputs from the user
    fields = []
    print("Now, enter the fields for your model.")
    print("Enter the fields in the format {NAME}:{DATATYPE}->{REFRENCE TABLE}:{REFERENCE NAME} or {NAME}:{DATATYPE} -p (primary key).")
    print("Type '/rev' to edit the last input. Type 'done' when you're finished.")
    
    while True:
        field_input = input("Field: ")

        # Allow user to revert the last entry
        if field_input.lower() == '/rev':
            if fields:
                removed_field = fields.pop()
                print(f"Removed the last entry: {removed_field[0]}")
            else:
                print("No entries to revert.")
            continue
        elif field_input.lower() == 'done':
            break

        # Parse the field and add it to the list
        parsed_field = parse_field_input(field_input)
        fields.append(parsed_field)
    
    # Generate the model code
    model_code = generate_model(model_name, fields)
    directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'generated-models')
    
    # Create the directory if it doesn't exist
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    # Define the path to the model file
    output_file = os.path.join(directory, f'{model_name}.ts')
    # Write the generated code to a TypeScript file
    output_file = f"{model_name.lower()}Model.ts"
    with open(output_file, 'w') as file:
        file.write(model_code)
    
    print(f"Sequelize model generated and saved as {output_file}!")

if __name__ == "__main__":
    main()
