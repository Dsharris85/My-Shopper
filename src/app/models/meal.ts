interface DBItem {
    name: string;
    id: string;
}

export interface ShoppingList extends DBItem {
    // required   
    meals: string[];

    // optionals
    description?: string;
    mealObjects?: Meal[];
}

export interface Meal extends DBItem {
    // required
    ingredients: Ingredient[]
    
    // optionals
    description?: string;
    editing?: boolean;
}

export interface Ingredient {
    // required
    name: string;
    unitAmount: number;
    
    // optionals
    unitLabel?: UnitLabel;

}

export enum UnitLabel {
    Quart = 'qt',
    Cup = 'c',
    Gallon = 'g',
    Milliliter = 'ml',
    Liter = 'l',
    Tablespoon = 'tbsp',
    Teaspoon = 'tsp',
    Gram = 'g',
    Ounce = 'oz',
    Pound = 'lb',
    Pint = 'p',
    Milligram = 'mg',
    Kilogram = 'kg',    
}