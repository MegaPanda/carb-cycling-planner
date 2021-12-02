import { faCaretLeft, faCaretRight, faCheck, faChevronLeft, faChevronRight, faEllipsisH, faEnvelope, faHome, faPlus, faSearch, faTimes, faUndo, faUnlockAlt, faUserCircle, faUserCog, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledIcon = styled(FontAwesomeIcon)`
    margin: auto;
`;

export const emailIcon = () => (<StyledIcon icon={faEnvelope} />);
export const passwordIcon = () => (<StyledIcon icon={faUnlockAlt} />);
export const userIcon = () => (<StyledIcon icon={faUserCircle} />);
export const homeIcon = () => (<StyledIcon icon={faHome} />);
export const foodIcon = () => (<StyledIcon icon={faUtensils} />);
export const settingIcon = () => (<StyledIcon icon={faUserCog} />);
export const returnIcon = () => (<StyledIcon icon={faChevronLeft} />);
export const nextIcon = () => (<StyledIcon icon={faChevronRight} />);
export const addIcon = () => (<StyledIcon icon={faCheck} />);
export const ellipsisIcon = () => (<StyledIcon icon={faEllipsisH} />);
export const searchIcon = () => (<StyledIcon icon={faSearch} />);
export const cancelIcon = () => (<StyledIcon icon={faTimes} />);
export const caretLeftIcon = () => (<StyledIcon icon={faCaretLeft} />);
export const caretRightIcon = () => (<StyledIcon icon={faCaretRight} />);
export const undoIcon = () => (<StyledIcon icon={faUndo} />);
export const plusIcon = () => (<StyledIcon icon={faPlus} />);