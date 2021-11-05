import styled from "styled-components";

export const NavContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: right;

  & span {
    margin-right: auto;
  }
`;
