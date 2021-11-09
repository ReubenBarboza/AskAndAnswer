import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-size: ${(props) => props.theme.fontSize.label};
  color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  &.active {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }
`;
