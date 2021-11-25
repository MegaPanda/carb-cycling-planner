import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { emailIcon, passwordIcon } from "../components/icons";
import { useAuth } from "../custom-hooks/useAuth";
import { useNavigate } from "react-router";
import SubmitButton from "../components/submitButton";
import AuthInputField from "../components/authInputField";

const Container = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
`;

const Title = styled.p`
    font-size: 36px;
    font-weight: 900;
    text-align: center;
`;

const Paragraph = styled.p`
    text-align: center;
`;

const LinkToSignUp = styled(Link)`
    margin-left: 5px;
    text-decoration: none;
    font-weight: 700;
    color: ${props => props.theme.colors.buttonGreen};

    :hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Title>Log In</Title>
            <form onSubmit={(event) => {
                event.preventDefault();
                auth.login(email, password, () => {
                    navigate("/user/dashboard");
                });
            }}>
                <AuthInputField labelText="E-mail" inputType="email" icon={emailIcon} updateInput={setEmail} />
                <AuthInputField labelText="Password" inputType="password" icon={passwordIcon} updateInput={setPassword} />
                <SubmitButton buttonText="LOG IN" />
            </form>
            <Paragraph>Not a member yet?
                <LinkToSignUp to="/signup">Sign Up</LinkToSignUp>
            </Paragraph>
        </Container>
    )
};

export default Login;