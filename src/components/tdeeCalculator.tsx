import { FormEvent, useState } from "react";
import styled from "styled-components/macro"
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { getTdee } from "../helpers/helpers";
import { setTDEE } from "../redux/reducers/userSlice";
import SubmitButton from "./submitButton";

const ToggleButton = styled.button`
    align-self: center;
    padding: 10px 8px;
    font-size: 10px;
    color: #E5E7EB;
    background-color: ${props => props.theme.colors.hoverGray};
    border-radius: 5px;
`;

const Wrapper = styled.div`
    padding: 8px;
    font-size: 10px;
    display: block ;
`;

const InputLabel = styled.label`
    display: block;
    padding-bottom: 6px;
    font-weight: 700;
`;

const Input = styled.input`
    width: 60px;
    padding: 4px;
`;




const TDEECalculator = ({ uid, userTdee }: { uid: string, userTdee: number }) => {
    const [data, setData] = useState({
        sex: "",
        age: 0,
        weight: 0,
        height: 0,
        activity: 1.2
    });

    const dispatch = useAppDispatch();
    
    const [showCalculator, setShowCalculator] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const tdee = getTdee(data.sex, data.weight, data.height, data.age, data.activity);
        if (!tdee || tdee < 1000) {
            alert("Invalid Data");
        } else {
            dispatch(setTDEE({ uid, tdee }));
            setData({
                sex: "",
                age: 0,
                weight: 0,
                height: 0,
                activity: 1.2
            });
            setShowCalculator(!showCalculator);
        }
    };

    return (
        <div> 
            <div>
                {/* since 0 is falsy, React won't return the second argument but the number itself */}
                <ToggleButton type="button" onClick={() => {setShowCalculator(!showCalculator);}}>
                    {Boolean(userTdee) ? `Recalculate` : `Calculator`}
                </ToggleButton>
                {Boolean(userTdee) && 
                    <p>Your TDEE is 
                        <span css={`font-size: 24px; font-weight: 900;`}>&nbsp;{userTdee}&nbsp;</span> 
                    kcal/day</p>
                }
            </div>
            {showCalculator &&
                <form onSubmit={(event) => handleSubmit(event)} css={`padding: 10px 0;`}>
                    <Wrapper>
                        <InputLabel>Sex:</InputLabel>
                        <Input type="radio" name="sex" id="F" onClick={() => setData({...data, sex: "F"})}
                            css={`width: 16px; margin: 0 0 0 -2px; vertical-align: bottom;`}  
                        />
                        <label htmlFor="F">Female</label>
                        <Input type="radio" name="sex" id="M" onClick={() => setData({...data, sex: "M"})}
                            css={`width: 16px; margin: 0 0 0 12px; vertical-align: bottom;`}
                        />
                        <label htmlFor="M">Male</label>
                    </Wrapper>
                    <Wrapper>
                        <InputLabel>Age:</InputLabel>
                        <Input type="tel" onChange={(event) => setData({...data, age: parseInt(event.target.value)})} />
                    </Wrapper>
                    <Wrapper>
                        <InputLabel>Height:</InputLabel>
                        <Input type="tel" placeholder="cm" onChange={(event) => setData({...data, height: parseInt(event.target.value)})} />
                    </Wrapper>
                    <Wrapper>
                        <InputLabel>Weight:</InputLabel>
                        <Input type="tel" placeholder="kg" onChange={(event) => setData({...data, weight: parseInt(event.target.value)})} />
                    </Wrapper>
                    <Wrapper>
                        <InputLabel>Life style:</InputLabel>
                        <select name="activity" onChange={(event) => setData({...data, activity: parseFloat(event.target.value)})} css={`padding: 4px;`}>
                            <option value="1.2">Sedentary (little to no exercise)</option>
                            <option value="1.375">Light Exercise (1-2 days/week)</option>
                            <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                            <option value="1.7">Heavy Exercise (6-7 days/week)</option>
                            <option value="1.9">Athlete (2x per day)</option>
                        </select>
                    </Wrapper>
                    <SubmitButton width="100%" buttonText="CALCULATE" />
                </form>
            }
        </div>
    )
};

export default TDEECalculator;