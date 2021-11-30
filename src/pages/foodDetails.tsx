import { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { getCalories, getUpdatedMacros } from "../helpers/helpers";
import { addIcon, returnIcon } from "../components/icons";
import { useNavigate } from "react-router";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { useFood } from "../custom-hooks/useFood";
import { addFood, updateFood } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem;
`;

const Nav = styled.div`
    display: flex;
    font-size: 24px;
    
    button {
        font-size: inherit;
    }

    p {
        flex: 1;
        margin: auto;
        padding-left: 2rem;
    }
`;

const Nutrients = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Nutrient = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin: 0;
    }
`;

const Weight = styled.div`
    margin: 2rem 0;
    text-align: right;
    font-size: 1.5rem;

    input {
        width: 80px;
        font-size: 1.5rem;
    }
`;

const Calories = styled(Nutrient)`
    padding-top: 2rem;

    h3, h1 {
        margin: 0;
    }

    h1 {
        font-size: 48px;
        font-weight: 900;
    }
`;



const FoodItemDetails = ({ uid }: { uid: string }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const food = useFood();
   
    const [gramsInput, setGramsInput] = useState(food.foodItem?.grams);
    const updatedFoodItem = getUpdatedMacros(food.foodItem!, gramsInput!);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? event.target.value : "0";
        setGramsInput(parseFloat(value));
    };

    const handleReturn = () => {
        navigate(-1);
    };

    const handleSubmit = () => {
        if (food.action === "Add Food") {
            dispatch(addFood({
                uid,
                food: updatedFoodItem,
                date: food.date,
                meal: food.meal
            }));
            navigate(-2);
        } else if (food.action === "Edit Food") {
            dispatch(updateFood({ 
                uid,
                diaryId: food.diaryId,
                food: updatedFoodItem
            }));
            food.setDiaryId("");
            navigate(-1);
        } 
    };

    return (
        <Container>
            <Nav>
                <button type="button" onClick={() => handleReturn()}>{returnIcon()}</button>
                <p>{food.action}</p>
                <button type="button" onClick={() => handleSubmit()}>{addIcon()}</button>
            </Nav>
            <h1 css={`
                font-size: 36px; 
                margin: 2rem 0;
            `}>{updatedFoodItem.name}</h1>
            <Nutrients>
                <Nutrient>
                    <p>Carbs</p>
                    <h2>{updatedFoodItem.carbs} g</h2>
                </Nutrient>
                <Nutrient>
                    <p>Protein</p>
                    <h2>{updatedFoodItem.protein} g</h2>
                </Nutrient>
                <Nutrient>
                    <p>Fat</p>
                    <h2>{updatedFoodItem.fat} g</h2>
                </Nutrient>
            </Nutrients>
            <Weight>
                <input type="tel" value={gramsInput} onChange={(event) => handleChange(event)} css={`
                    width: 60px;
                    padding: 8px;
                    text-align: center;
                `}/> g
            </Weight>
            <Calories>
                <h3>Calories</h3>
                <h1>{getCalories(updatedFoodItem.carbs, updatedFoodItem.protein, updatedFoodItem.fat)}</h1> 
            </Calories>
        </Container>
    )
};

export default FoodItemDetails;