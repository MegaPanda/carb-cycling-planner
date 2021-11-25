import { Navigate } from "react-router";
import styled from "styled-components";
import { useAuth } from "../custom-hooks/useAuth";
import { UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem;
`;

const Title = styled.p`
    font-size: 30px;
    font-weight: 900;
`;

const Dashboard = ({userData}: {userData: UserState}) => {
    const auth = useAuth();
    
    if (Boolean(userData.tdee) && userData.username) {
        return (
            <Container>
                <Title>Hi, {userData.username}!</Title>
            </Container>
        )
    } else {
        return (
            <Navigate to="/user/setup" />
        )
    }
    
};

export default Dashboard;