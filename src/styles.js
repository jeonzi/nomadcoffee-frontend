import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
	bgColor: "#FAFAFA",
	fontColor: "blue",
};

export const darkTheme = {
	bgColor: "black",
	fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
	
    body {
	    background-color: ${(props) => props.theme.bgColor};
    }
`;
