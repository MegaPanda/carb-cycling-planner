import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { emailIcon, passwordIcon } from "../components/icons";
import SubmitButton from "../components/submitButton";
import AuthInputField from "../components/authInputField";
import { signup } from "../redux/reducers/userSlice";
import useAppDispatch from "../custom-hooks/useAppDispatch";

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

const LinkToLogIn = styled(Link)`
    margin-left: 5px;
    text-decoration: none;
    font-weight: 900;
    color: ${props => props.theme.colors.buttonGreen};

    :hover {
        text-decoration: underline;
    }
`;

const SignUp = () => {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Title>Sign Up</Title>
            <form onSubmit={(event) => {
                event.preventDefault();
                dispatch(signup({ email, password }));
            }}>
                <AuthInputField labelText="E-mail" inputType="email" icon={emailIcon} updateInput={setEmail} />
                <AuthInputField labelText="Password" inputType="password" icon={passwordIcon} updateInput={setPassword} />
                <SubmitButton width="100%" buttonText="SIGN UP" />
            </form>
            <Paragraph>Already a member?
                <LinkToLogIn to="/login">Log In</LinkToLogIn>
            </Paragraph>
        </Container>
    )
};

export default SignUp;