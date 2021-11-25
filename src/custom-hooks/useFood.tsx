import React, { createContext, useContext, useState } from "react";
import { FoodItemType, MealType } from "../redux/reducers/userSlice";

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
    const [meal, setMeal] = useState<MealType>("breakfast");
    const [foodItem, setFoodItem] = useState<FoodItemType | undefined>(undefined);

    return { action, date, meal, foodItem, setAction, setDate, setMeal, setFoodItem };
}