import 'styled-components';
import { CSSProp } from 'styled-components';

const theme = {
    border: "1px solid #9CA3AF",
    colors: {
        labelGray: "#6B7280",
        buttonGreen: "#059669",
        hoverGreen: "#065F46",
        buttonGray: "#6B7280",
        hoverGray: "#374151",
        focusBlue: "#3B82F6",
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