import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); //100px is the NavbarContainer height
  background-color: ${(props) => props.theme.colors.background2};
`;
