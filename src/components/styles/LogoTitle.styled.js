import styled from "styled-components";
import { Link } from "react-router-dom";
export const LogoTitle = styled(Link)`
  font-size: 40px;
  color: ${(props) => props.theme.colors.primary};
  margin-left: 5rem;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
`;
