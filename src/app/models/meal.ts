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
    recipe?: string[];
}

export interface Ingredient {
    // required
    name: string;
    unitAmount: number;
    
    // optionals
    unitLabel?: UnitLabel;
    sectionOfStore?: StoreSection;

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

export enum Units2 {
    Whole,
    Gallon = "Gallon(s) of",
    Pound = "Pound(s) of",
    Liter = "Liter(s) of",
    Milliliter = "Milliliter(s) of",
    Ounce = "Ounce(s) of",
    Can = "Can(s) of",
    Cup = "Cup(s) of",
    Pack = "Package(s) of",
    Jar = "Jar(s) of",
    Serving = "Serving(s) of",


}

export enum StoreSection {
    Frozens = "Frozens",
    Meat = "Meat",
    Breads = "Breads",
    Dairy = "Dairy",
    Snacks = "Snacks",
    AisleThings = "Aisle Things",
}