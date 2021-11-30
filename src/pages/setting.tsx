import { useState } from "react";
import styled from "styled-components/macro";
import DietGoal from "../components/dietGoal";
import LoggingButton from "../components/loggingButton";
import TDEECalculator from "../components/tdeeCalculator";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import useToggle from "../custom-hooks/useToggle";
import { setUsername, UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem 2rem 8rem 2rem;;
`;

const ToggleButton = styled.button`
    display: block;
    padding: 1rem 0;
    font-weight: 700;
    color: ${props => props.theme.colors.buttonGreen};
`;

const Wrapper = styled.div`
    margin-bottom: 3rem;
`;

const UsernameInput = styled.input`
    height: 40px;
    padding-left: 10px;
    font-size: 16px;
    border: ${props => props.theme.border};
    flex: 1;

    :focus {
        border: none;
        outline: 2px solid ${props => props.theme.colors.focusBlue};
    }
`;

const ChangeNameButton = styled.button`
    display: block;
    margin-top: 0.75rem;
    padding: 0.5rem;
    border: none;
    font-size: 0.75rem;
    color: white;
    background-color: ${props => props.theme.colors.buttonGreen};
    border-radius: 0.25rem;

    :hover {
        background-color: ${props => props.theme.colors.hoverGreen};
    }

    :disabled {
        background-color: ${props => props.theme.colors.hoverGray};
        cursor: default;
    }
`;

const Setting = ({ user }: { user: UserState }) => {
    const dispatch = useAppDispatch();
    const [showName, setShowName] = useToggle();
    const [showTdee, setShowTdee] = useToggle();
    const [showGoal, setShowGoal] = useToggle();
    const [name, setName] = useState(user.username);

    const handleClick = () => {
        if (name) {
            dispatch(setUsername({ username: name }));
        }
    };
    
    return (
        <Container>
            <LoggingButton uid={user.uid} />
            <h1>MY INFO</h1>
            <ToggleButton type="button" onClick={() => setShowName()}>Change My Profile Name</ToggleButton>
            {showName &&
                <Wrapper>
                    <UsernameInput type="text" value={name!} onChange={(event) => setName(event.target.value)} />
                    <ChangeNameButton type="button" disabled={!Boolean(name)} onClick={() => handleClick()}>Change</ChangeNameButton>
                </Wrapper>
            }
            <ToggleButton type="button" onClick={() => setShowTdee()}>Update My TDEE</ToggleButton>
            {showTdee &&
                <Wrapper>
                    <TDEECalculator uid={user.uid} userTdee={user.tdee} />
                </Wrapper>
            }
            <ToggleButton type="button" onClick={() => setShowGoal()}>Update My Goal</ToggleButton>
            {showGoal &&
                <DietGoal uid={user.uid} goal={user.goal} />
            }
        </Container>
    )
};

export default Setting;