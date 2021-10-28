import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  @media (max-width: ${(props) => props.theme.screenSize.sm}) {
    transition: width 1s ease-in-out;
    visibility: ${(props) => (props.show ? "visible" : "hidden")};
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 3rem;
    width: ${(props) => (props.animate ? "10rem" : "0rem")};
    transition: width 1s ease-in-out;
    height: 100vh;
    top: 3.2rem;
    background-color: ${(props) => props.theme.colors.background2};
  }
`;
