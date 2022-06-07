import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
	bgColor: "#FAFAFA",
	fontColor: "#6F4E37",
	borderColor: "#3E1404",
};

export const darkTheme = {
	bgColor: "#6F4E37",
	fontColor: "#3E1404",
	borderColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
	input {
		all: unset; // input의 모든 porperty가 삭제됨
	}
	* {
		box-sizing: border-box ;
	}
    body {
	    background-color: ${(props) => props.theme.bgColor};
		font-size: 14px;
		font-family:'Open Sans', sans-serif ;
		color: ${(props) => props.theme.fontColor};
    }
	a {
		text-decoration: none;
	}
`;
