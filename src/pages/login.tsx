import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import AuthForm from "../components/authForm"

const Container = styled.div`
    padding: 3rem;
`;

const Paragraph = styled.p`
    text-align: center;
`;

const Login = () => {
    return (
        <Container>
            <AuthForm title="Log In" />
            <Paragraph>Not a member yet?
                <Link to="/signup" css={`
                    margin-left: 5px;
                    text-decoration: none;
                    font-weight: 900;
                    color: #1D4ED8;
                    :hover {
                        text-decoration: underline;
                    }
                `}>Sign Up</Link>
            </Paragraph>
        </Container>
    )
};

export default Login;