import styled from "styled-components";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { setGoal } from "../redux/reducers/userSlice";

const Wrapper = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    justify-items: center;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 100px;
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

const DietGoal = ({goal}: {goal: string}) => {
    const dispatch = useAppDispatch();

    const handleSelect = (goal: string) => {
        dispatch(setGoal(goal));
    };
    
    return (
        <Wrapper>
            <div>
                <RadioButton type="radio" name="phase" id="cutting" hidden 
                    checked={goal === "cutting"} onChange={() => handleSelect("cutting")}
                />
                <Label htmlFor="cutting">
                    <div>Cutting</div>
                    <div css={`font-size: 8px;`}>(TDEE - 300)</div>
                </Label>
            </div>
            <div>
                <RadioButton type="radio" name="phase" id="maintaining" hidden 
                    checked={goal === "maintaining"} onChange={() => handleSelect("maintaining")}
                />
                <Label htmlFor="maintaining">
                    <div>Maintaining</div>
                    <div css={`font-size: 8px;`}>(TDEE)</div>
                </Label>
            </div>
            <div>
                <RadioButton type="radio" name="phase" id="bulking" hidden 
                    checked={goal === "bulking"} onChange={() => handleSelect("bulking")}
                />
                <Label htmlFor="bulking">
                    <div>Bulking</div>
                    <div css={`font-size: 8px;`}>(TDEE + 300)</div>
                </Label>
            </div>
        </Wrapper>
    )
};

export default DietGoal;