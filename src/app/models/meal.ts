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

export enum UnitLabel2 {
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

// export enum UnitLabel {
//     Can = "Can(s) of",
//     Cup = "Cup(s) of",
//     Gallon = "Gallon(s) of",
//     Gram = "Gram(s) of",
//     Jar = "Jar(s) of",
//     Liter = "Liter(s) of",
//     Milligram = "Milligram(s) of",
//     Milliliter = "Milliliter(s) of",
//     Ounce = "Ounce(s) of",
//     Pack = "Package(s) of",
//     Pound = "Pound(s) of",
//     Serving = "Serving(s) of",
//     Tablespoon = "Tablespoon(s) of",
//     Teaspoon = "Teaspoon(s) of",
//     Whole = "Whole",   
// }

export enum UnitLabel {
    can = "Can(s) of",
    cup = "Cup(s) of",
    gal = "Gallon(s) of",
    g = "Gram(s) of",
    jar = "Jar(s) of",
    l = "Liter(s) of",
    mg = "Milligram(s) of",
    ml = "Milliliter(s) of",
    oz = "Ounce(s) of",
    pack = "Package(s) of",
    lb = "Pound(s) of",
    serving = "Serving(s) of",
    Tbs = "Tablespoon(s) of",
    tsp = "Teaspoon(s) of",
    whole = "Whole",   
}

export enum StoreSection {
    Frozens = "Frozens",
    Meat = "Meat",
    Breads = "Breads",
    Dairy = "Dairy",
    FruitVeg = "Fruit and Veggies",
    Snacks = "Snacks",
    AisleThings = "Aisle Things",
}

export interface ExportedData {
    meals?: Meal[];
    lists?: ShoppingList[];
}