import styled from "styled-components";
import { getCalories } from "../helpers/helpers";
import FoodItem from "./foodItem";
import { useNavigate } from "react-router";
import { useFood } from "../custom-hooks/useFood";
import { DiaryEntry, MealName } from "../redux/reducers/userSlice";

const Container = styled.div`
    margin-top: 2rem;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 12px 12px -10px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 6px 0 6px 0;
    font-size: 20px;
    font-weight: 900;

    p {
        margin: 0;
    }
`;

const Add = styled.button`
    display: block;
    margin: auto;
    padding: 10px 0;
    font-weight: 600;
    color: ${props => props.theme.colors.buttonGreen};
`;

const Meal = ({
    meal,
    mealItems
}: {
    meal: MealName,
    mealItems: DiaryEntry[] | undefined
}) => {
    const navigate = useNavigate();
    const food = useFood();

    const handleClick = (action: string, meal: MealName) => {
        food.setAction(action);
        food.setMeal(meal);
        navigate("/user/foodSearch");
    };

    return (
        <Container>
            <Wrapper>
                <p>{meal.toUpperCase()}</p>
                <p>{mealItems && mealItems.reduce((a, b) => a + getCalories(b.food.carbs, b.food.protein, b.food.fat), 0)}</p>
            </Wrapper>
            {mealItems && 
                mealItems.map((mealItem) => {
                    return (<FoodItem key={mealItem.id} foodItem={mealItem.food} diaryId={mealItem.id} meal={meal} />)
                })
            }
            <Add onClick={() => handleClick("Add Food", meal)}>ADD FOOD</Add>
        </Container>
    )
};

export default Meal;