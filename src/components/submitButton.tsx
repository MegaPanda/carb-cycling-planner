import styled from "styled-components";

const Button = styled.button<{width: string}>`
    display: block;
    width: ${props => props.width};
    padding: 0.5rem;
    margin-top: 8px;
    border: none;
    color: white;
    background-color: ${props => props.theme.colors.buttonGreen};

    :hover {
        background-color: ${props => props.theme.colors.hoverGreen};
    }
`;

const SubmitButton = ({width, buttonText}: {width: string, buttonText: string}) => {
    return (
        <Button width={width} type="submit">{buttonText}</Button>
    )
};

export default SubmitButton;