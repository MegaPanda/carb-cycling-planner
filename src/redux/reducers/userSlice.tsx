import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FoodItemType = {
    name: string;
    grams: number;
    carbs: number;
    protein: number;
    fat: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack"

export type MealsType = {
    breakfast: FoodItemType[];
    lunch: FoodItemType[];
    dinner: FoodItemType[];
    snack: FoodItemType[];
}

export type DiaryEntryType = {
    date: string;
    carbsLevel: string;
    meals: MealsType;
}

export interface UserState {
    id: string;
    username: string;
    tdee: number;
    goal: string;
    diary: DiaryEntryType[];
}

const initialState: UserState = {
    id: "",
    username: "",
    tdee: 0,
    goal: "maintaining",
    diary: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setTDEE: (state, action: PayloadAction<number>) => {
            state.tdee = action.payload;
        },
        setGoal: (state, action: PayloadAction<string>) => {
            state.goal = action.payload;
        },
        setDailyCarbsLevel: (state, action: PayloadAction<{carbsLevel: string, date: string}>) => {
            function add() {
                const entryIndex = state.diary.findIndex((entry) => entry.date === action.payload.date);
                if (entryIndex === -1) {
                    state.diary.push({
                        date: action.payload.date,
                        carbsLevel: "",
                        meals: {
                            breakfast: [],
                            lunch: [],
                            dinner: [],
                            snack: []
                        }
                    });
                    add();
                } else {
                    state.diary[entryIndex].carbsLevel = action.payload.carbsLevel;
                }
            };
            add();
        },
        addFoodItem: (state, action: PayloadAction<{foodItem: FoodItemType, date: string, meal: MealType}>) => {
            function add() {
                const entryIndex = state.diary.findIndex((entry) => entry.date === action.payload.date);
                if (entryIndex === -1) {
                    state.diary.push({
                        date: action.payload.date,
                        carbsLevel: "",
                        meals: {
                            breakfast: [],
                            lunch: [],
                            dinner: [],
                            snack: []
                        }
                    });
                    add();
                } else {
                    state.diary[entryIndex].meals[action.payload.meal].push(action.payload.foodItem);
                }
            };
            add();
        },
        deleteFoodItem: (state, action:PayloadAction<{foodName: string, foodGrams: number, date: string, meal: MealType}>) => {
            state.diary.forEach((entry) => {
                if (entry.date === action.payload.date) {
                    const itemIndex = entry.meals[action.payload.meal].findIndex((item) => item.name === action.payload.foodName && item.grams === action.payload.foodGrams);
                    entry.meals[action.payload.meal].splice(itemIndex, 1);
                }
            });
        }

    }
})

export const { setId, setUsername, setTDEE, setGoal, setDailyCarbsLevel, addFoodItem, deleteFoodItem } = userSlice.actions;

export default userSlice.reducer;
