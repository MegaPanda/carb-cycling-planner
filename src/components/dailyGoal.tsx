import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components/macro";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { useFood } from "../custom-hooks/useFood";
import { getMicrosGoal, getTdeeGoal } from "../helpers/helpers";
import { setDailyCarbsLevel } from "../redux/reducers/userSlice";
import { ellipsisIcon } from "./icons";
import SubmitButton from "./submitButton";

const Form = styled.form`
    display: flex; 
    flex-direction: column; 
    align-items: center;
    height: 120px; 
`;

const Wrapper = styled.div`
    padding: 10px 5px;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    justify-items: center;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 90px;
    height: 40px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    cursor: pointer;
    
    div {
        margin: auto;
        font-size: 10px;
        font-weight: 700;
    }
`;

const RadioButton = styled.input`
    :checked + ${Label} {
        box-shadow: ${props => props.theme.colors.buttonGreen} 0px 0px 1px 2px;
    }
`;

const ResetButton = styled.button`
    width: 30px;
    text-align: right;
    color: ${props => props.theme.colors.labelGray};
`;

const MicrosWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`;

const Micro = styled.div`
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        font-size: 8px;
    }
`;

const MicroGrams = styled.h2<{over?: boolean}>`
    margin: 8px 0 0 0;
    color: ${props => props.over ? props.theme.colors.warningRed : props.theme.colors.buttonGreen};
`;

type MicrosGoalType = {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
}




const DailyGoal = ({
    uid,
    tdee, 
    goal,
    dailyCarbsLevel,
    consumedMicros
}: {
    uid: string;
    tdee: number; 
    goal: string;
    dailyCarbsLevel: string | undefined;
    consumedMicros: MicrosGoalType;
}) => {
    const dispatch = useAppDispatch();
    const food = useFood();
    
    useEffect(() => {
        if (dailyCarbsLevel) {
            setCarbsLevel(dailyCarbsLevel);
            setMicrosGoal(getMicrosGoal(getTdeeGoal(tdee, goal), dailyCarbsLevel));
            setShowGoalForm(false);
        } else {
            setCarbsLevel(undefined);
            setMicrosGoal(undefined);
            setShowGoalForm(true);
        }
    }, [dailyCarbsLevel]);

    const [carbsLevel, setCarbsLevel] = useState<string | undefined>(undefined);
    const [microsGoal, setMicrosGoal] = useState<MicrosGoalType | undefined>(undefined);
    const [showGoalForm, setShowGoalForm] = useState(true);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (carbsLevel) {
            setMicrosGoal(getMicrosGoal(getTdeeGoal(tdee, goal), carbsLevel));
            dispatch(setDailyCarbsLevel({
                uid,
                carbsLevel,
                date: food.date
            }));
            setShowGoalForm(false);
        }
    };


    return (
        <div>
            {showGoalForm &&
                <Form onSubmit={(event) => handleSubmit(event)} css={``}>
                    <Wrapper>
                        <div>
                            <RadioButton type="radio" name="carbs" id="low" hidden 
                                checked={carbsLevel === "low"} onChange={() => setCarbsLevel("low")}
                            />
                            <Label htmlFor="low">
                                <div>Low Carbs</div>
                            </Label>
                        </div>
                        <div>
                            <RadioButton type="radio" name="carbs" id="moderate" hidden 
                                checked={carbsLevel === "moderate"} onChange={() => setCarbsLevel("moderate")}
                            />
                            <Label htmlFor="moderate">
                                <div>Moderate Carbs</div>
                            </Label>
                        </div>
                        <div>
                            <RadioButton type="radio" name="carbs" id="high" hidden 
                                checked={carbsLevel === "high"} onChange={() => setCarbsLevel("high")}
                            />
                            <Label htmlFor="high">
                                <div>High Carbs</div>
                            </Label>
                        </div>
                    </Wrapper>
                    <SubmitButton width="286px" buttonText="SET GOAL" />
                </Form>
            }
            {(microsGoal && !showGoalForm) &&
                <div css={`height: 120px;`}>
                    <div css={`display: flex; justify-content: space-between;`}>
                        <h5 css={`margin: 12px 0;`}>Your Daily Goal (Remaining Micros)</h5>
                        <ResetButton type="button" onClick={() => setShowGoalForm(true)}>{ellipsisIcon()}</ResetButton>
                    </div>
                    <MicrosWrapper>
                        <Micro> 
                            <span>Carbs</span>
                            <MicroGrams over={microsGoal.carbs - consumedMicros.carbs < 0}>
                                {microsGoal.carbs - consumedMicros.carbs < 0 
                                    ? "+" + Math.abs(microsGoal.carbs - consumedMicros.carbs)
                                    : microsGoal.carbs - consumedMicros.carbs
                                }
                            </MicroGrams>
                        </Micro>
                        <Micro>
                            <span>Protein</span>
                            <MicroGrams over={microsGoal.protein - consumedMicros.protein < 0}>
                                {microsGoal.protein - consumedMicros.protein < 0
                                    ? "+" + Math.abs(microsGoal.protein - consumedMicros.protein)
                                    : microsGoal.protein - consumedMicros.protein
                                }
                            </MicroGrams>
                        </Micro>
                        <Micro>
                            <span>Fat</span>
                            <MicroGrams over={microsGoal.fat - consumedMicros.fat < 0}>
                                {microsGoal.fat - consumedMicros.fat < 0
                                    ? "+" + Math.abs(microsGoal.fat - consumedMicros.fat)
                                    : microsGoal.fat - consumedMicros.fat
                                }
                            </MicroGrams>
                        </Micro>
                        <Micro>
                            <span>Calories</span>
                            <MicroGrams over={microsGoal.calories - consumedMicros.calories < 0}>
                                {microsGoal.calories - consumedMicros.calories < 0
                                    ? "+" + Math.abs(microsGoal.calories - consumedMicros.calories)
                                    : microsGoal.calories - consumedMicros.calories
                                }
                            </MicroGrams>
                        </Micro>
                    </MicrosWrapper>
                </div>
            }
        </div>
    )
};

export default DailyGoal;