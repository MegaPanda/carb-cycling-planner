import styled from "styled-components";
import { getCalories } from "../helpers/helpers";
import { FoodItemType, MealType } from "../redux/reducers/userSlice";
import FoodItem from "./foodItem";
import { useNavigate } from "react-router";
import { useFood } from "../custom-hooks/useFood";

const Container = styled.div`
    margin-top: 30px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 12px 12px -10px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 6px 2px 6px 0;
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
    foodItems
}: {
    meal: MealType,
    foodItems: FoodItemType[] | undefined
}) => {
    const navigate = useNavigate();
    const food = useFood();

    const handleClick = (action: string, meal: MealType) => {
        food.setAction(action);
        food.setMeal(meal);
        navigate("/user/foodSearch");
    };

    return (
        <Container>
            <Wrapper>
                <p>{meal.toUpperCase()}</p>
                <p>{foodItems && foodItems.reduce((a, b) => a + getCalories(b.carbs, b.protein, b.fat), 0)}</p>
            </Wrapper>
            {foodItems && 
                foodItems.map((foodItem, index) => {
                    return (<FoodItem key={index} foodItem={foodItem} meal={meal} />)
                })
            }
            <Add onClick={() => handleClick("Add Food", meal)}>ADD FOOD</Add>
        </Container>
    )
};

export default Meal;