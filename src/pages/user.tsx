import styled from "styled-components";
import NavigationButton from "../components/navigationButton";
import { useAuth } from "../custom-hooks/useAuth";

const Title = styled.p`
    padding: 3rem;
    font-size: 48px;
    font-weight: 900;
`;

const User = () => {
    const auth = useAuth();
    
    return (
        <div>
            <Title>Welcome, {auth?.user?.displayName}</Title>
            <NavigationButton buttonType="button" buttonText="Log Out" isBackward={true}></NavigationButton>
        </div>
    )
};

export default User;