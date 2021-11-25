import React from "react";
import styled from "styled-components";

interface ModalProps {
    opacity: number;
    backgroundColor: string;
}

export const ModalContainer = styled.div<ModalProps>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: ${props => props.backgroundColor};
    opacity: ${props => props.opacity};
`;

const FullPageModal = ({
    children, 
    opacity, 
    backgroundColor
}: {
    children: React.ReactNode, 
    opacity: number,
    backgroundColor: string
}) => {
    return (
        <ModalContainer backgroundColor={backgroundColor} opacity={opacity}>{children}</ModalContainer> 
    )
};

export default FullPageModal;