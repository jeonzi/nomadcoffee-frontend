import { ApolloClient, InMemoryCache, HttpLink, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (TOKEN) => {
	localStorage.setItem(TOKEN, TOKEN);
	isLoggedInVar(true);
};

export const logUserOut = (navigate) => {
	localStorage.removeItem(TOKEN);
	navigate.replace();
	window.localStorage.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
	localStorage.setItem(DARK_MODE, "enabled");
	darkModeVar(true);
};

export const disableDarkMode = () => {
	localStorage.removeItem(DARK_MODE);
	darkModeVar(false);
};

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
