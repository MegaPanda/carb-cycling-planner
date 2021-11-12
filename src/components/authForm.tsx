import { faUnlockAlt, faUserCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components/macro";
import LoginInputField from "./loginInputField";
import NavigationButton from "./navigationButton";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const Title = styled.p`
    font-size: 36px;
    font-weight: 900;
    text-align: center;
`;

const AuthForm = ({title}: {title: string}) => {
    const emailIcon = () => (<FontAwesomeIcon icon={faEnvelope} style={{margin: "auto"}} />);
    const passwordIcon = () => (<FontAwesomeIcon icon={faUnlockAlt} style={{margin: "auto"}} />);
    const userIcon = () => (<FontAwesomeIcon icon={faUserCircle} style={{margin: "auto"}} />);

    return (
        <Container>
            <Title>{title}</Title>
            <form>
                {title === "Sign Up" && 
                <LoginInputField labelText="Username" inputType="text" icon={userIcon} />
                }
                <LoginInputField labelText="E-mail" inputType="email" icon={emailIcon} />
                <LoginInputField labelText="Password" inputType="password" icon={passwordIcon} />
                <NavigationButton buttonType="submit" buttonText={title.toUpperCase()} isBackward={false} />
            </form>
        </Container>
    )
};

export default AuthForm;