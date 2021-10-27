import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 110vh;
    width: 20rem;
    height: 100vh;
    top: 30px;
    background-color: ${(props) => props.theme.colors.background};
  }
`;
