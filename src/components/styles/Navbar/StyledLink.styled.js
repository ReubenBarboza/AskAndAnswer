import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSize.label};
  color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  margin: 10px;
  width: max-content;
  text-decoration: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  transition: background-color 1s ease;
  border-radius: 10px;

  &.active {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
