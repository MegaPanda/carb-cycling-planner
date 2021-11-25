import styled from "styled-components/macro";
import Meal from "../components/meal";
import useAppSelector from "../custom-hooks/useAppSelector";
import { format } from "date-fns";
import { useFood } from "../custom-hooks/useFood";
import { useEffect } from "react";
import { caretLeftIcon, caretRightIcon } from "../components/icons";
import { addDays } from "date-fns/esm";
import { Navigate } from "react-router";
import DailyGoal from "../components/dailyGoal";
import { getConsumedMicros } from "../helpers/helpers";

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



const Diary = () => {
    const user = useAppSelector((state) => state.user);
    const food = useFood();

    useEffect(() => {
        food.setAction("Edit Food");
    }, []);

    const mealsData = user.diary.find((entry) => entry.date === food.date)?.meals;
    const dailyCarbsLevel = user.diary.find((entry) => entry.date === food.date)?.carbsLevel;

    const handleNewDate = (distance: number) => {
        const newDate = format(addDays(Date.parse(food.date), distance), "dd MMM");
        food.setDate(newDate);
    };

    const consumedMicros = getConsumedMicros(mealsData);
    console.log(consumedMicros);

    if (user.tdee) {
        return (
            <Container>
                <DiaryDate>
                    <Icon type="button" onClick={() => handleNewDate(-1)}>{caretLeftIcon()}</Icon>
                    <h3>{food.date}</h3>
                    <Icon type="button" onClick={() => handleNewDate(1)}>{caretRightIcon()}</Icon>
                </DiaryDate>
                <DailyGoal tdee={user.tdee} goal={user.goal} dailyCarbsLevel={dailyCarbsLevel} consumedMicros={consumedMicros} />
                <Meal meal="breakfast" foodItems={mealsData?.breakfast} />
                <Meal meal="lunch" foodItems={mealsData?.lunch} />
                <Meal meal="dinner" foodItems={mealsData?.dinner} />
                <Meal meal="snack" foodItems={mealsData?.snack} />
            </Container>
        )
    } else {
        return (
            <Navigate to="/user/setup" />
        )
    }
    
};

export default Diary;