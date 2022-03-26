import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
    ${normalize()}
    .main-wrapper {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        justify-content: flex-start;
    }
`;

export default GlobalStyles;
