import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 10px 0;
`;

const Label = styled.label`
    font-size: 12px;
    color: ${props => props.theme.colors.labelGray};
`;

const InputDiv = styled.div`
    display: flex;
    margin-top: 5px;
    height: 40px;
    border: ${props => props.theme.border};

    :focus-within {
        border: none;
        outline: 2px solid ${props => props.theme.colors.focusBlue};
    }
`;

const Icon = styled.div`
    display: flex;
    width: 30px;
    height: 100%;
    vertical-align: top;
    opacity: 0.5;
`;

const Input = styled.input`
    flex: 1;
    height: 100%;
    padding: 5px 5px 5px 0;
    border: none;

    :focus {
        outline: none;
    }
`;

const AuthInputField = ({
    labelText,
    inputType,
    icon,
    updateInput
}: {
    labelText: string,
    inputType: string,
    icon: () => JSX.Element,
    updateInput: Dispatch<SetStateAction<string>>
}) => {
    return (
        <Wrapper>
            <Label>{labelText}</Label>
            <InputDiv>
                <Icon>{icon()}</Icon>
                <Input type={inputType} onChange={(event) => updateInput(event.target.value)} />
            </InputDiv>
        </Wrapper>
    )
};

export default AuthInputField;