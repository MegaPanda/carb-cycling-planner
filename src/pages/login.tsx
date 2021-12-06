import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { emailIcon, passwordIcon } from "../components/icons";
import SubmitButton from "../components/submitButton";
import AuthInputField from "../components/authInputField";
import { login } from "../redux/reducers/userSlice";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import useAppSelector from "../custom-hooks/useAppSelector";

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

const ErrorMessage = styled.p`
    text-align: center;
    color: ${props => props.theme.colors.warningRed};
    font-weight: 600;
`;

const Login = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useAppSelector(state => state.user.firebaseError);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleError = (error: string | undefined) => {
        switch (error) {
            case "auth/user-not-found":
                return "The account doesn't exist.";
            case "auth/wrong-password":
                return "Incorrect e-mail or password.";
            default:
                break;
        }
    };

    return (
        <Container>
            <Title>Log In</Title>
            <form onSubmit={(event) => handleLogin(event)}>
                <AuthInputField labelText="E-mail" inputType="email" icon={emailIcon} updateInput={setEmail} />
                <AuthInputField labelText="Password" inputType="password" icon={passwordIcon} updateInput={setPassword} />
                <ErrorMessage>{handleError(error)}</ErrorMessage>
                <SubmitButton width="100%" buttonText="LOG IN" />
            </form>
            <Paragraph>Not a member yet?
                <LinkToSignUp to="/signup">Sign Up</LinkToSignUp>
            </Paragraph>
        </Container>
    )
};

export default Login;