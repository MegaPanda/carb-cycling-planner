import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import LoggingButton from "../components/loggingButton";
import { useAuth } from "../custom-hooks/useAuth";

const Container = styled.div`
    padding: 2rem 2rem 2rem 3rem;
`;

const Title = styled.p`
    font-size: 48px;
    font-weight: 900;
`;

const LinkToDashboard = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    color: ${props => props.theme.colors.buttonGreen};

    :hover {
        text-decoration: underline;
    }
`;

const Home = () => {
    const auth = useAuth();

    return (
        <Container>
            <LoggingButton />
            <Title>Carb<br />Cycling<br />Planner</Title>
            {auth.user && (
                <LinkToDashboard to="user/dashboard">Start Planning</LinkToDashboard>
            )}
        </Container>
    )
};

export default Home;