import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin:0px;
    padding:0px;
    box-sizing: border-box;
    font-family:${(props) => props.theme.fonts[0]}
}`;

export default GlobalStyles;
