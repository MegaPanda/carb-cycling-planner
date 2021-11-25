import { Link } from "react-router-dom";
import styled from "styled-components";
import { foodIcon, homeIcon, settingIcon } from "./icons";

const Container = styled.div`
    position: fixed;
    width: 100%;
    max-width: 480px;
    height: 60px;
    bottom: 0;
    margin-left: -2px;
    z-index: 9;
    border: 2px solid;
    background-color: white;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const IconLink = styled(Link)`
    display: flex;
    font-size: 20px;
    opacity: 0.7;
`;

const Nav = () => {
    return (
        <Container>
            <IconLink to="/user/dashboard">{homeIcon()}</IconLink>
            <IconLink to="/user/diary">{foodIcon()}</IconLink>
            <IconLink to="/user/setting">{settingIcon()}</IconLink>
        </Container>
    )
};

export default Nav;