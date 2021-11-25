import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAuth } from "../custom-hooks/useAuth";

const Wrapper = styled.div`
    text-align: right;
`;

const StyledLoggingButton = styled.button`
    padding: 10px;
    border: 1px solid;
    font-weight: 700;
`;

const LoggingButton = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    if (auth.user) {
        return (
            <Wrapper>
                <StyledLoggingButton onClick={() => {
                    auth.logout(() => navigate("/"));
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