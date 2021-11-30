import { Navigate } from "react-router";
import styled from "styled-components";
import { UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem;
`;

const Title = styled.p`
    font-size: 30px;
    font-weight: 900;
`;

const Dashboard = ({ user }: { user: UserState }) => {
    if (user.username) {
        return (
            <Container>
                <Title>Hi, {user.username}!</Title>
            </Container>
        )
    } else {
        return (
            <Navigate to="/user/setup" />
        )
    }
    
};

export default Dashboard;