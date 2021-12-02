import React, { createContext, useContext, useState } from "react";
import { Food, MealName } from "../redux/reducers/userSlice";

const FoodContext = createContext<IFood | undefined>(undefined);

type IFood = ReturnType<typeof useProvideFood>

export function ProvideFood({children}: {children: React.ReactNode}) {
    const food = useProvideFood();
    return <FoodContext.Provider value={food}>{children}</FoodContext.Provider>
}

export const useFood = () => {
    const context = useContext(FoodContext);
    if (context === undefined) {
        throw new Error("out of Context");
    }

    return context; 
}

function useProvideFood() {
    const [action, setAction] = useState("");
    const [date, setDate] = useState("");
    const [meal, setMeal] = useState<MealName>("breakfast");
    const [foodItem, setFoodItem] = useState<Food>({
        name: "",
        grams: 0,
        carbs: 0,
        protein: 0,
        fat: 0    
    });
    const [diaryId, setDiaryId] = useState<string>("");

    return { action, date, meal, foodItem, diaryId, setAction, setDate, setMeal, setFoodItem, setDiaryId };
}