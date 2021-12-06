import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components/macro";
import FullPageModal from "../components/fullPageModal";
import { addIcon, returnIcon } from "../components/icons";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { useFood } from "../custom-hooks/useFood";
import { capitalizeName, getCalories, getKeywords } from "../helpers/helpers";
import { addFood, createFood, Food } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem;
`;

const Nav = styled.div`
    display: flex;
    font-size: 24px;
    
    button {
        width: 25px;
        font-size: inherit;
    }

    p {
        flex: 1;
        margin: auto;
        padding-left: 1.5rem;
    }
`;

const NameInput = styled.input`
    width: 100%;
    height: 40px;
    margin: 2rem 0;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    padding: 0 0.5rem;
    font-size: 1.5rem;

    ::placeholder {
        font-size: 1rem;
        font-style: italic;
    }

    :focus {
        border-bottom: 2px solid ${props => props.theme.colors.focusBlue};
        color: ${props => props.theme.colors.focusBlue};
    }
`;

const Nutrients = styled.div`
    height: 100px;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;

    @media (min-width: 360px) {
        padding: 1rem;
    }
`;

const Nutrient = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        margin: 0;
    }

    h3 {
        margin: 0.5rem 0;
    }

    input {
        width: 4rem;
        border: none;
        outline: none;
        border-bottom: 1px solid black;
        font-size: 1.5rem;
        text-align: center;

        :focus {
            border-bottom: 2px solid ${props => props.theme.colors.focusBlue};
            color: ${props => props.theme.colors.focusBlue};
        }
    }
`;

const Weight = styled.div`
    margin: 2rem 0;
    text-align: right;
    font-size: 1.5rem;

    span {
        padding: 8px;
        font-size: 2rem;
        font-weight: 900;
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

const ConfirmModal = styled.div`
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    width: 300px;
    height: 150px;
    z-index: 999;
    background-color: white;
    border: ${props => props.theme.border};
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    display: flex;
    flex-direction: column;

    p, h3 {
        margin: 1rem 0 0 0;
        padding: 0 1rem;
    }
`;

const ConfirmButton = styled.button`
    width: 70px;
    height: 40px;
    text-align: center;
`;



const CreateFood = ({ uid }: { uid: string }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const food = useFood();

    const [foodToCreate, setfoodToCreate] = useState({
        name: "",
        grams: 100,
        carbs: "",
        protein: "",
        fat: ""
    });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReturn = () => {
        food.setAction("Add Food");
        navigate(-1);
    };

    const handleMicrosChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
        setfoodToCreate({
            ...foodToCreate,
            [field]: event.target.value
        });
    };

    const handleCreate = () => {
        const foodToAdd: Food = {
            name: foodToCreate.name.toLowerCase(),
            grams: 100,
            carbs: parseFloat(foodToCreate.carbs),
            protein: parseFloat(foodToCreate.protein),
            fat: parseFloat(foodToCreate.fat)
        };
        if (!foodToAdd.name || isNaN(foodToAdd.carbs) || isNaN(foodToAdd.protein) || isNaN(foodToAdd.fat)) {
            alert("Please enter the fields");
        } else {
            dispatch(createFood({ food: {
                ...foodToAdd,
                keywords: [...getKeywords(foodToCreate.name.toLowerCase())]
            }}))
                .then(() => {
                    food.setFoodItem(foodToAdd);
                    setShowConfirm(true);
                });
        }
    };

    const handleAdd = () => {
        dispatch(addFood({
            uid,
            food: food.foodItem,
            date: food.date,
            meal: food.meal
        })).then(() => {
            setShowConfirm(false);
            navigate(-2);
        });
    };

    return (
        <Container>
            <Nav>
                <button type="button" onClick={() => handleReturn()}>{returnIcon()}</button>
                <p>Create Food</p>
                <button type="button" onClick={() => handleCreate()}>{addIcon()}</button>
            </Nav>
            <NameInput type="text" placeholder="Food Name" value={foodToCreate.name} onChange={(event) => setfoodToCreate({ ...foodToCreate, name: event.target.value })} />
            <Nutrients>
                <Nutrient>
                    <p>Carbs</p>
                    <h3>
                        <input type="number" inputMode="numeric" value={foodToCreate.carbs} onChange={(event) => handleMicrosChange(event, "carbs")} /> g
                    </h3>
                </Nutrient>
                <Nutrient>
                    <p>Protein</p>
                    <h3>
                        <input type="number" inputMode="numeric" value={foodToCreate.protein} onChange={(event) => handleMicrosChange(event, "protein")} /> g
                    </h3>
                </Nutrient>
                <Nutrient>
                    <p>Fat</p>
                    <h3>
                        <input type="number" inputMode="numeric" value={foodToCreate.fat} onChange={(event) => handleMicrosChange(event, "fat")} /> g
                    </h3>
                </Nutrient>
            </Nutrients>
            <Weight>
                <span>100</span> g
            </Weight>
            <Calories>
                <h3>Calories</h3>
                <h1>{
                    isNaN(parseFloat(foodToCreate.carbs)) || isNaN(parseFloat(foodToCreate.protein)) || isNaN(parseFloat(foodToCreate.fat))
                        ? <span css={`font-size: 0.5rem; font-style: italic; opacity: 0.5;`}>Fill the micros to get calories!</span>
                        : getCalories(parseFloat(foodToCreate.carbs), parseFloat(foodToCreate.protein), parseFloat(foodToCreate.fat))
                }</h1>
            </Calories>
            {showConfirm &&
                <ConfirmModal>
                    <p>Successfully created new food!</p>
                    <h3>Add {capitalizeName(foodToCreate.name)} to {capitalizeName(food.meal)}?</h3>
                    <div css={`margin-top: auto; display: flex; justify-content: space-between;`}>
                        <ConfirmButton onClick={() => handleReturn()}>SKIP</ConfirmButton>
                        <ConfirmButton onClick={() => handleAdd()} css={`color: #059669; font-weight: 700;`}>ADD {addIcon()}</ConfirmButton>
                    </div>
                </ConfirmModal>
            }
            {showConfirm &&
                <FullPageModal backgroundColor="black" opacity={0.5}>
                </FullPageModal>
            }
        </Container>
    )
};

export default CreateFood;