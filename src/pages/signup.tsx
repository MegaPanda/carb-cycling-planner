import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { emailIcon, passwordIcon } from "../components/icons";
import SubmitButton from "../components/submitButton";
import AuthInputField from "../components/authInputField";
import { signup } from "../redux/reducers/userSlice";
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

const LinkToLogIn = styled(Link)`
    margin-left: 5px;
    text-decoration: none;
    font-weight: 900;
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

const SignUp = () => {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useAppSelector(state => state.user.firebaseError);

    const handleSignup = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(signup({ email, password }));
    };

    const handleError = (error: string | undefined) => {
        switch (error) {
            case "auth/email-already-in-use":
                return "This email has already been registered.";
            case "auth/weak-password":
                return "The password has to be at least 6 characters.";
            default:
                break;
        }
    };

    return (
        <Container>
            <Title>Sign Up</Title>
            <form onSubmit={(event) => handleSignup(event)}>
                <AuthInputField labelText="E-mail" inputType="email" icon={emailIcon} updateInput={setEmail} />
                <AuthInputField labelText="Password" inputType="password" icon={passwordIcon} updateInput={setPassword} />
                <ErrorMessage>{handleError(error)}</ErrorMessage>
                <SubmitButton width="100%" buttonText="SIGN UP" />
            </form>
            <Paragraph>Already a member?
                <LinkToLogIn to="/login">Log In</LinkToLogIn>
            </Paragraph>
        </Container>
    )
};

export default SignUp;