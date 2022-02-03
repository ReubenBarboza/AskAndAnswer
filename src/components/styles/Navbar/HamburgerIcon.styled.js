import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const HamburgerIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  position: sticky;
  margin-right: 3rem;
  z-index: 300;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: 900px) {
    display: none;
  }
  @media (max-width: ${(props) => props.theme.screenSize.xs}) {
    margin-right: 1rem;
  }
`;
