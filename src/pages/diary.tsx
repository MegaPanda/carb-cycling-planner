import styled from "styled-components/macro";
import Meal from "../components/meal";
import { format, parse } from "date-fns";
import { useFood } from "../custom-hooks/useFood";
import { useEffect } from "react";
import { caretLeftIcon, caretRightIcon } from "../components/icons";
import { addDays } from "date-fns/esm";
import { Navigate } from "react-router";
import DailyGoal from "../components/dailyGoal";
import { getConsumedMicros } from "../helpers/helpers";
import { UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    min-height: calc(100vh - 4px);
    padding: 2rem 2rem 8rem 2rem;
`;

const DiaryDate = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Icon = styled.button`
    display: flex;
    width: 30px;
    font-size: 24px;
`;



const Diary = ({ user }: { user: UserState }) => {
    const food = useFood();

    useEffect(() => {
        food.setAction("Edit Food");
    }, []);

    const diaryToday = user.diary.filter((entry) => entry.date === food.date);
    const dailyCarbsLevel = user.carbsLevel[food.date];

    const handleNewDate = (distance: number) => {
        const newDate = format(addDays(parse(food.date, "dd MMM", new Date()), distance), "dd MMM");
        food.setDate(newDate);
    };

    const consumedMicros = getConsumedMicros(diaryToday);

    if (user.tdee) {
        return (
            <Container>
                <DiaryDate>
                    <Icon type="button" onClick={() => handleNewDate(-1)}>{caretLeftIcon()}</Icon>
                    <h3>{food.date}</h3>
                    <Icon type="button" onClick={() => handleNewDate(1)}>{caretRightIcon()}</Icon>
                </DiaryDate>
                <DailyGoal uid={user.uid} tdee={user.tdee} goal={user.goal} dailyCarbsLevel={dailyCarbsLevel} consumedMicros={consumedMicros} />
                <Meal meal="breakfast" mealItems={diaryToday.filter((entry) => entry.meal === "breakfast")} />
                <Meal meal="lunch" mealItems={diaryToday.filter((entry) => entry.meal === "lunch")} />
                <Meal meal="dinner" mealItems={diaryToday.filter((entry) => entry.meal === "dinner")} />
                <Meal meal="snack" mealItems={diaryToday.filter((entry) => entry.meal === "snack")} />
            </Container>
        )
    } else {
        return (
            <Navigate to="/user/setup" />
        )
    }
    
};

export default Diary;