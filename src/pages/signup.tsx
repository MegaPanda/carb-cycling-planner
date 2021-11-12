import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import AuthForm from "../components/authForm";

const Container = styled.div`
    padding: 3rem;
`;

const Paragraph = styled.p`
    text-align: center;
`;

const SignUp = () => {
    return (
        <Container>
            <AuthForm title="Sign Up"></AuthForm>
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