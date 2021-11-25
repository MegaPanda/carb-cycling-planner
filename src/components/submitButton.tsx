import styled from "styled-components";

const Button = styled.button`
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-top: 8px;
    border: none;
    color: white;
    background-color: ${props => props.theme.colors.buttonGreen};

    :hover {
        background-color: ${props => props.theme.colors.hoverGreen};
    }
`;

const SubmitButton = ({buttonText}: {buttonText: string}) => {
    return (
        <Button type="submit">{buttonText}</Button>
    )
};

export default SubmitButton;