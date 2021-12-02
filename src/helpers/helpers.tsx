import { DiaryEntry, Food } from "../redux/reducers/userSlice";

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

export const getUpdatedMacros = (foodItem: Food, gramsInput: number) => {
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
            protein = Math.round(tdeeGoal * 0.3 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        case "moderate": 
            carbs = Math.round(tdeeGoal * 0.35 / 4);
            protein = Math.round(tdeeGoal * 0.3 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        case "high": 
            carbs = Math.round(tdeeGoal * 0.5 / 4);
            protein = Math.round(tdeeGoal * 0.3 / 4);
            fat = Math.round((tdeeGoal - (carbs + protein) * 4) / 9);
            return { calories: tdeeGoal, carbs, protein, fat};
        default:
            throw new Error(carbsLevel + " is unknown");
    }
};

export const getConsumedMicros = (diaryToday: DiaryEntry[]) => {
    function getConsumedMicro(diaryToday: DiaryEntry[], micro: "carbs" | "protein" | "fat") {                                    
        return Math.round(
                diaryToday.map((entry) => entry.food)
                // sum the values in the objects //
                .reduce((a, b) => a + b[micro], 0));
    };

    if (diaryToday.length !== 0) {
        const carbs = getConsumedMicro(diaryToday, "carbs");
        const protein = getConsumedMicro(diaryToday, "protein");
        const fat = getConsumedMicro(diaryToday, "fat");

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

export const getKeywords = (name: string) => {
    let str = name;
    let keywordsArray: string[] = [];

    while (str.length >= 1) {
        for (let i = 0; i < str.length; i++) {
            let slicedStr = str.slice(0, i + 1);
            if (!keywordsArray.some((keyword) => keyword === slicedStr) && slicedStr !== " ") {
                keywordsArray.push(str.slice(0, i + 1));
            }
        }
        str = str.slice(1);
    }

    return keywordsArray;
};

export const capitalizeName = (name: string) => {
    return name.replaceAll("-", " - ").replace(/\s+/g, " ").trim()
        .split(" ").map(str => str[0].toUpperCase() + str.slice(1)).join(" ");
};