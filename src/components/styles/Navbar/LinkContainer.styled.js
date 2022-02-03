import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;
  z-index: 100;

  @media (max-width: 900px) {
    transition: width 0.75s ease-in-out;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 0rem;
    overflow: hidden;
    margin-top: 3rem;
    width: ${(props) => (props.animate ? "10rem" : "0rem")};
    height: calc(100vh - 100px);
    top: 3.2rem;
    background-color: ${(props) => props.theme.colors.background};
    opacity: 0.9;
  }
`;
