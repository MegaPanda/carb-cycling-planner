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

const SignUp = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Title>Sign Up</Title>
            <form onSubmit={(event) => {
                event.preventDefault();
                auth.signup(email, password, () => {
                    navigate("/user/dashboard");
                });
            }}>
                <AuthInputField labelText="E-mail" inputType="email" icon={emailIcon} updateInput={setEmail} />
                <AuthInputField labelText="Password" inputType="password" icon={passwordIcon} updateInput={setPassword} />
                <SubmitButton buttonText="SIGN UP" />
            </form>
            <Paragraph>Already a member?
                <Link to="/login" css={`
                    margin-left: 5px;
                    text-decoration: none;
                    font-weight: 900;
                    color: #1D4ED8;
                    :hover {
                        text-decoration: underline;
                    }
                `}>Log In</Link>
            </Paragraph>
        </Container>
    )
};

export default SignUp;