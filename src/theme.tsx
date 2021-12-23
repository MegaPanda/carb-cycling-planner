import 'styled-components';
import { createGlobalStyle, CSSProp } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        cursor: default;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
`;

const theme = {
    border: "1px solid #D1D5DB",
    colors: {
        labelGray: "#6B7280",
        buttonGreen: "#059669",
        hoverGreen: "#065F46",
        buttonGray: "#6B7280",
        hoverGray: "#374151",
        focusBlue: "#3B82F6",
        warningRed: "#DC2626",
    },
};

type ThemeInterface = typeof theme;

declare module 'styled-components' {
    interface DefaultTheme extends ThemeInterface {}
};

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: CSSProp;
    }
}

export default theme;