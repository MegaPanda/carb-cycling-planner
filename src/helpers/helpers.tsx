import { FoodItemType, MealsType } from "../redux/reducers/userSlice";

export const getCalories = (carbs: number, protein: number, fat: number) => {
    return Math.round((carbs + protein) * 4 + fat * 9);
};

export const getTdee = (sex: string, weight: number, height: number, age: number, activity: number) => {
    if (sex === "M") {
        return Math.round((88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * activity);
    } else {
        return Math.round((447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * activity);
    }
};

export const getUpdatedMacros = (foodItem: FoodItemType, gramsInput: number) => {
    function updateMacro(macro: number, baseGrams: number) {
        return parseFloat((macro * (baseGrams / foodItem.grams)).toFixed(1));
    }

    return {
        ...foodItem,
        grams: gramsInput,
        carbs: updateMacro(foodItem.carbs, gramsInput),
        protein: updateMacro(foodItem.protein, gramsInput),
        fat: updateMacro(foodItem.fat, gramsInput)
    }
};

export const getFocus = (id: string) => document.getElementById(id)?.focus();

export const getTdeeGoal = (tdee: number, phase: string) => {
    if (!tdee) {
        throw new Error("Invalid TDEE");
    }

    switch (phase) {
        case "cutting":
            return tdee - 300;
        case "maintaining":
            return tdee;
        case "bulking":
            return tdee + 300;
        default:
            throw new Error(phase + " is unknown");
    }
};

export const getMicrosGoal = (tdeeGoal: number, carbsLevel: string) => {
    let carbs;
    let protein;
    let fat;
    switch (carbsLevel) {
        case "low":
            carbs = Math.round(tdeeGoal * 0.1 / 4);
            protein = Math.round(tdeeGoal * 0.35 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        case "moderate": 
            carbs = Math.round(tdeeGoal * 0.30 / 4);
            protein = Math.round(tdeeGoal * 0.35 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        case "high": 
            carbs = Math.round(tdeeGoal * 0.5 / 4);
            protein = Math.round(tdeeGoal * 0.35 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        default:
            throw new Error(carbsLevel + " is unknown");
    }
};

export const getConsumedMicros = (mealsData: MealsType | undefined) => {
    function getConsumedMicro(mealsData: MealsType, micro: "carbs" | "protein" | "fat") {                                    
        return Math.round(
                Object.values(mealsData)
                // flatten the array first//
                .reduce((a, b) => a.concat(b))
                // then sum the values in the objects //
                .reduce((a, b) => a + b[micro], 0));
    };

    if (mealsData) {
        const carbs = getConsumedMicro(mealsData, "carbs");
        const protein = getConsumedMicro(mealsData, "protein");
        const fat = getConsumedMicro(mealsData, "fat");

        return {
            carbs,
            protein,
            fat,
            calories: getCalories(carbs, protein, fat),
        }
    } else {
        return {
            carbs: 0,
            protein: 0,
            fat: 0,
            calories: 0
        }
    }
};
