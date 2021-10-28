import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 25px;
  border: none;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-size: 20px;
`;
