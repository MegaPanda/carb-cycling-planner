import { useNavigate } from "react-router";
import styled from "styled-components/macro";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { useFood } from "../custom-hooks/useFood";
import useToggle from "../custom-hooks/useToggle";
import { capitalizeName, getCalories } from "../helpers/helpers";
import { deleteFood, Food, MealName } from "../redux/reducers/userSlice";
import { ellipsisIcon } from "./icons";
import FullPageModal from "./fullPageModal";
import useAppSelector from "../custom-hooks/useAppSelector";

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
    diaryId, 
    meal
}: {
    foodItem: Food;
    diaryId?: string;
    meal: MealName
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const food = useFood();
    const uid = useAppSelector(state => state.user.uid);

    const showFoodDetails = () => {
        food.setFoodItem(foodItem);
        food.setMeal(meal);
        diaryId ? food.setDiaryId(diaryId) : food.setDiaryId("");
        navigate("/user/foodDetails");
    };

    const [showDelete, setShowDelete] = useToggle();

    const handleDelete = (diaryId: string) => {
        dispatch(deleteFood({ uid, diaryId }));
        setShowDelete();
    };

    return (
        <Container>
            <FoodButton onClick={() => showFoodDetails()}>
                <div>
                    <Title>{capitalizeName(foodItem.name)}</Title>
                    <Weight>{foodItem.grams} gram</Weight>
                </div>
            </FoodButton>
            <Info>
                {food.action === "Edit Food" && diaryId &&
                    <Ellipsis type="button" onClick={() => setShowDelete()}>{ellipsisIcon()}</Ellipsis>
                }
                <Calories>{getCalories(foodItem.carbs, foodItem.protein, foodItem.fat)}</Calories>
                {showDelete && diaryId &&
                    <DeleteButton type="button" autoFocus onBlur={() => setShowDelete()} onClick={() => handleDelete(diaryId)}>DELETE</DeleteButton>
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