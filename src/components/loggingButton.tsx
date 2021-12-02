import { useNavigate } from "react-router";
import styled from "styled-components";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import { logout } from "../redux/reducers/userSlice";

const Wrapper = styled.div`
    text-align: right;
`;

const StyledLoggingButton = styled.button`
    padding: 10px;
    border: 1px solid;
    font-weight: 700;
`;

const LoggingButton = ({uid}: {uid: string}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (uid) {
        return (
            <Wrapper>
                <StyledLoggingButton onClick={() => {
                    dispatch(logout());
                    navigate("/")
                }}>Log Out</StyledLoggingButton>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <StyledLoggingButton onClick={() => 
                    navigate("login")
                }>Log In</StyledLoggingButton>
            </Wrapper>
        )
    }
    
};

export default LoggingButton;