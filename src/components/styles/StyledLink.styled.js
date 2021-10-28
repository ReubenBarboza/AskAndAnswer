import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  margin: 15px;
  text-decoration: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 10px;
  }
`;
