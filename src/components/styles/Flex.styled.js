import styled from "styled-components";

export const StyledDiv = styled.div`
  display: ${(props) => props.display};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
`;
