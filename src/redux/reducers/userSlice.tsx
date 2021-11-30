import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebaseApp, firestoreDB } from "../../firebase/firebase";

export type Food = {
    name: string;
    keywords?: string[];
    grams: number;
    carbs: number;
    protein: number;
    fat: number;
}

export type MealName = "breakfast" | "lunch" | "dinner" | "snack"

export type DiaryEntry = {
    id: string;
    date: string;
    meal: MealName;
    food: Food;
}

export type DailyCarbsLevel = {
    [date: string]: string;
}

export interface UserState {
    uid: string;
    username: string | null;
    tdee: number;
    goal: string;
    diary: DiaryEntry[];
    carbsLevel: DailyCarbsLevel;
}

interface UserDataQuery {
    tdee: number;
    goal: string;
    carbsLevel: DailyCarbsLevel;
}

interface DiaryQuery {
    date: string;
    meal: MealName;
    food: Food;
}

const initialState: UserState = {
    uid: "",
    username: null,
    tdee: 0,
    goal: "maintaining",
    diary: [],
    carbsLevel: {}
}

const auth = getAuth(firebaseApp);

export const signup = createAsyncThunk(
    "user/signup",
    async ({ email, password }: { email: string, password: string }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(firestoreDB, "users", userCredential.user.uid), {
            tdee: 0,
            goal: "maintaining",
            carbsLevel: {}
        });
        return { uid: userCredential.user.uid }
});


export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }: { email: string, password: string }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { uid: userCredential.user.uid, username: userCredential.user.displayName }
});

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({ uid }: { uid: string }) => {
        const userDataQuery = await getDoc(doc(firestoreDB, "users", uid));
        const userData = userDataQuery.data() as UserDataQuery;

        let diary: DiaryEntry[] = [];
        const diaryQuery = await getDocs(collection(firestoreDB, "users", uid, "diary"));
        diaryQuery.forEach((doc) => diary.push({
            id: doc.id,
            ...doc.data() as DiaryQuery
        }));
        
        return { 
            ...userData,
            diary: [...diary]
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    () => signOut(auth)
);

export const setUsername = createAsyncThunk(
    "user/setUsername",
    ({ username }: { username: string }) => {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, { displayName: username });
        }
    return username;
});

export const setTDEE = createAsyncThunk(
    "user/setTDEE",
    async ({ uid, tdee }: { uid: string, tdee: number }) => {
        await setDoc(doc(firestoreDB, "users", uid), {
            tdee: tdee
        }, { merge: true })
        return tdee
    }
);

export const setGoal = createAsyncThunk(
    "user/setGoal",
    async ({ uid, goal }: { uid: string, goal: string }) => {
        await setDoc(doc(firestoreDB, "users", uid), {
            goal: goal
        }, { merge: true })
        return goal
    }
);

export const setDailyCarbsLevel = createAsyncThunk(
    "user/setDailyCarbsLevel",
    async ({ uid, date, carbsLevel }: { uid: string, date: string, carbsLevel: string }) => {
        await setDoc(doc(firestoreDB, "users", uid), {
            carbsLevel: {
                [date]: carbsLevel
            }
        }, { merge: true })
        return { date, carbsLevel }
    }
);

export const addFood = createAsyncThunk(
    "user/addFood",
    async ({ uid, food, date, meal }: { uid: string, food: Food, date: string, meal: MealName }) => {
        const foodRef = await addDoc(collection(firestoreDB, "users", uid, "diary"), {
            date,
            meal,
            food
        });
        return { food, date, meal, id: foodRef.id }
    }
);

export const updateFood = createAsyncThunk(
    "user/updateFood",
    async ({ uid, diaryId, food }: { uid: string, diaryId: string, food: Food }) => {
        await setDoc(doc(firestoreDB, "users", uid, "diary", diaryId), {
            food: {
                ...food
            }
        }, { merge: true })
        return { diaryId, food }
    }
);

export const deleteFood = createAsyncThunk(
    "user/deleteFood",
    async ({ uid, diaryId }: { uid: string, diaryId: string }) => {
        await deleteDoc(doc(firestoreDB, "users", uid, "diary", diaryId));
        return { diaryId }
    }
)



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ uid: string, username: string | null }>) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.rejected, () => console.log("sign up failed"))
        builder.addCase(signup.fulfilled, (state, action) => {
            state.uid = action.payload.uid;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.tdee = action.payload.tdee;
            state.goal = action.payload.goal;
            state.diary = [...action.payload.diary];
            state.carbsLevel = {...action.payload.carbsLevel};
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            return initialState;
        })
        builder.addCase(setUsername.fulfilled, (state, action) => {
            state.username = action.payload;
        })
        builder.addCase(setTDEE.fulfilled, (state, action) => {
            state.tdee = action.payload;
        })
        builder.addCase(setGoal.fulfilled, (state, action) => {
            state.goal = action.payload;
        })
        builder.addCase(setDailyCarbsLevel.fulfilled, (state, action) => {
            state.carbsLevel[action.payload.date] = action.payload.carbsLevel;
        })
        builder.addCase(addFood.fulfilled, (state, action) => {
            state.diary.push(action.payload);
        })
        builder.addCase(updateFood.fulfilled, (state, action) => {
            const entryIndex = state.diary.findIndex((entry) => entry.id === action.payload.diaryId);
            state.diary[entryIndex].food = {...action.payload.food};
        })
        builder.addCase(deleteFood.fulfilled, (state, action) => {
            state.diary = [...state.diary.filter((entry) => entry.id !== action.payload.diaryId)];
        })
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
