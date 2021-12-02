import styled from "styled-components/macro";
import LoggingButton from "../components/loggingButton";

const Container = styled.div`
    padding: 2rem 2rem 2rem 3rem;
`;

const Title = styled.p`
    font-size: 48px;
    font-weight: 900;
`;

const Home = ({ uid }: { uid: string }) => {
    return (
        <Container>
            <LoggingButton uid={uid} />
            <Title>Carb<br />Cycling<br />Planner</Title>
        </Container>
    )
};

export default Home;