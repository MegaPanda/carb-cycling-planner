import { useNavigate } from "react-router";
import styled from "styled-components/macro";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { useFood } from "../custom-hooks/useFood";
import useToggle from "../custom-hooks/useToggle";
import { getCalories } from "../helpers/helpers";
import { deleteFoodItem, FoodItemType, MealType } from "../redux/reducers/userSlice";
import { ellipsisIcon } from "./icons";
import ReactModal from "react-modal";
import FullPageModal from "./fullPageModal";

ReactModal.setAppElement("#root");

const Container = styled.div`
    display: flex;
    border-bottom: ${props => props.theme.border};
`;

const FoodButton = styled.div`
    flex: 1;
    padding: 10px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    p {
        margin: 0;
    }
`;

const Title = styled.p`
    padding-left: 2px;
    font-weight: 700;
`;

const Weight = styled.p`
    padding: 6px 0 0 2px;
`;

const Info = styled.div`
    position: relative;
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Ellipsis = styled.button`
    height: 30px;
    color: ${props => props.theme.colors.labelGray};
`;

const Calories = styled.p`
    margin: 0;
    height: 30px;
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 0;
    width: 80px;
    height: 40px;
    z-index: 999;
    background-color: white;
    border: ${props => props.theme.border};
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

const FoodItem = ({
    foodItem,
    meal
}: {
    foodItem: FoodItemType;
    meal: MealType;
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const food = useFood();

    const showFoodDetails = (foodItem: FoodItemType, meal: MealType) => {
        food.setFoodItem(foodItem);
        food.setMeal(meal);
        navigate("/user/foodDetails");
    };

    const [showDelete, setShowDelete] = useToggle();

    const handleDelete = (foodItem: FoodItemType, date: string, meal: MealType) => {
        dispatch(deleteFoodItem({
            foodName: foodItem.name,
            foodGrams: foodItem.grams,
            date,
            meal
        }));
        setShowDelete();
    };

    return (
        <Container>
            <FoodButton onClick={() => showFoodDetails(foodItem, meal)}>
                <div>
                    <Title>{foodItem.name}</Title>
                    <Weight>{foodItem.grams} gram</Weight>
                </div>
            </FoodButton>
            <Info>
                {food.action === "Edit Food" &&
                    <Ellipsis type="button" onClick={() => setShowDelete()}>{ellipsisIcon()}</Ellipsis>
                }
                <Calories>{getCalories(foodItem.carbs, foodItem.protein, foodItem.fat)}</Calories>
                {showDelete &&
                    <DeleteButton type="button" autoFocus onBlur={() => setShowDelete()} onClick={() => handleDelete(foodItem, food.date, meal)}>DELETE</DeleteButton>
                }
            </Info>
            {showDelete &&
                <FullPageModal backgroundColor="black" opacity={0.5}>
                </FullPageModal>
            }
        </Container>
    )
};

export default FoodItem;