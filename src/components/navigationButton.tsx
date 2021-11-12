import styled from "styled-components";

interface ButtonProps {
    isBackward?: boolean;
}

const Button = styled.button.attrs(props => ({
    type: props.type,
}))<ButtonProps>`
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 2rem; 
    border: none;
    color: white;
    background-color: ${props => props.isBackward ? props.theme.colors.buttonGray : props.theme.colors.buttonGreen};

    :hover {
        background-color: ${props => props.isBackward ? props.theme.colors.hoverGray : props.theme.colors.hoverGreen};
    }
`;

const NavigationButton = ({
    buttonType,
    buttonText,
    isBackward
}: {
    buttonType: "button" | "submit" | "reset" | undefined,
    buttonText: string,
    isBackward: boolean
}) => {
    return (
        <Button type={buttonType} isBackward={isBackward}>{buttonText}</Button>
    )
};

export default NavigationButton;