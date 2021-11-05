import styled from "styled-components";
import { Link } from "react-router-dom";
export const LogoTitle = styled(Link)`
  display: inline-block;
  width: 100px;
  font-size: ${(props) => props.theme.fontSize.logoTitle};
  color: ${(props) => props.theme.colors.primary};
  margin-left: 5rem;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
  @media (max-width: ${(props) => props.theme.screenSize.lg}) {
    font-size: 30px; //logoTitle is 40px currently.
  }
  @media (max-width: ${(props) => props.theme.screenSize.xs}) {
    margin-left: 1rem;
  }
`;
