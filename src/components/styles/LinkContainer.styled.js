import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  @media (max-width: ${(props) => props.theme.screenSize.sm}) {
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 3rem;
    width: 10rem;
    height: 100vh;
    top: 30px;
    background-color: ${(props) => props.theme.colors.background};
  }
`;
