import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const HamburgerIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  position: sticky;
  right: 3.5rem;
  z-index: 300;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.screenSize.sm}) {
    display: none;
  }
  @media (max-width: ${(props) => props.theme.screenSize.xs}) {
    right: 1rem;
  }
`;
