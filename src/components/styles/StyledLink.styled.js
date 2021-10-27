import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  font-size: 30px;
  color: ${(props) => props.theme.colors.primary};
  padding: 20px;
  margin: 15px;
  text-decoration: none;
  border-bottom: 2px solid white;
  border-radius: 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
