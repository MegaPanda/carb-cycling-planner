import { Food } from "./redux/reducers/userSlice";

interface FoodData extends Food {
    keywords?: string[];
}

export const foodData: FoodData[] = [
    {
        name: "egg",
        grams: 100,
        carbs: 0.7,
        protein: 12.6,
        fat: 9.5       
    },
    {
        name: "burger buns",
        grams: 100,
        carbs: 46.1,
        protein: 9.7,
        fat: 5.5       
    },
    {
        name: "chicken breast salami",
        grams: 100,
        carbs: 2,
        protein: 18,
        fat: 2       
    },
    {
        name: "beef steak",
        grams: 100,
        carbs: 3.8,
        protein: 48.5,
        fat: 3.8
    },
    {
        name: "chicken thigh with skin",
        grams: 100,
        carbs: 0,
        protein: 15.9,
        fat: 16.8
    },
    {
        name: "skinless chicken thign",
        grams: 100,
        carbs: 0.5,
        protein: 19,
        fat: 7.6
    },
    {
        name: "jasmine rice",
        grams: 100,
        carbs: 78,
        protein: 6.8,
        fat: 0.8
    },
    {
        name: "pork neck",
        grams: 100,
        carbs: 0,
        protein: 18,
        fat: 13
    },
    {
        name: "shrimps",
        grams: 100,
        carbs: 0.9,
        protein: 13.2,
        fat: 0.9
    },
    {
        name: "spaghetti",
        grams: 100,
        carbs: 74.1,
        protein: 12.3,
        fat: 1.8
    },
    {
        name: "greek yogurt 2% fat",
        grams: 100,
        carbs: 4,
        protein: 6,
        fat: 2
    },
    {
        name: "banana", 
        grams: 100,
        carbs: 21.4,
        protein: 1,
        fat: 0.3
    },
    {
        name: "frozen blueberries",
        grams: 100,
        carbs: 6.7,
        protein: 0.4,
        fat: 0.1
    },
    {
        name: "muesli with mixed fruits",
        grams: 100,
        carbs: 30.7,
        protein: 4,
        fat: 2.2
    },
    {
        name: "impact whey protein - milk tea",
        grams: 100,
        carbs: 4,
        protein: 76,
        fat: 7.2
    },
    {
        name: "impact whey protein - strawberry cream",
        grams: 100,
        carbs: 12,
        protein: 72,
        fat: 8
    },
    {
        name: "milk 1.5% fat",
        grams: 100,
        carbs: 5,
        protein: 3.5,
        fat: 1.5
    }
];