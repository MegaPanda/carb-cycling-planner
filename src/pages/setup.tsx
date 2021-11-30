import { useState } from "react";
import { Navigate } from "react-router";
import styled from "styled-components/macro";
import DietGoal from "../components/dietGoal";
import { addIcon, nextIcon, returnIcon } from "../components/icons";
import TDEECalculator from "../components/tdeeCalculator";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { setUsername, UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem;
`;

const Wrapper = styled.div`
    padding: 1rem 0;
`;

const UsernameInput = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 10px;
    font-size: 16px;
    border: ${props => props.theme.border};

    :focus {
        border: none;
        outline: 2px solid ${props => props.theme.colors.focusBlue};
    }
`;

const StepButton = styled.button`
    width: 70px;
    height: 40px;
    text-align: center;
`;

const Setup = ({ user }: { user: UserState }) => {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (!name) {
            setStep(1);
        } else if (!Boolean(user.tdee)) {
            setStep(2);
        } else {
            dispatch(setUsername({ username: name }));
        }
    };

    if (!user.username) {
        return (
            <Container>
                <h2>Set Up Your Profile</h2>
                {step === 1 &&
                    <Wrapper>
                        <h5>Step 1 - Enter Your Name</h5>
                        <UsernameInput type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </Wrapper>
                }
                {step === 2 &&
                    <Wrapper>
                        <h5>Step 2 - Calculate Your TDEE</h5>
                        <TDEECalculator uid={user.uid} userTdee={user.tdee} />
                    </Wrapper>
                }
                {step === 3 &&
                    <Wrapper>
                        <h5>Step 3 - Choose Your Goal</h5>
                        <DietGoal uid={user.uid} goal={user.goal} />
                    </Wrapper>
                }
                <Wrapper css={`display: flex; justify-content: space-between;`}>
                    {step > 1 
                        ? <StepButton type="button" onClick={() => setStep((step) => step - 1)}>
                            {returnIcon()} BACK</StepButton> 
                        : <div />
                    }
                    {step < 3
                        ? <StepButton type="button" onClick={() => setStep((step) => step + 1)}>
                            NEXT {nextIcon()}</StepButton> 
                        : <StepButton type="button" onClick={() => handleSubmit()} 
                            css={`color: #059669; font-weight: 700;`}>START {addIcon()}</StepButton>
                    }
                </Wrapper>
            </Container>
        )
    } else {
        return <Navigate to="/user/dashboard" />
    }
};

export default Setup;