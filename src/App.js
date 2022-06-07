import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";

function App() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const darkMode = useReactiveVar(darkModeVar);

	return (
		<ApolloProvider client={client}>
			<HelmetProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<GlobalStyles />
					<Router>
						<Routes>
							<Route
								exact
								path={routes.home}
								element={isLoggedIn ? <Home /> : <Login />}
							/>
							<Route
								path={routes.signUp}
								element={!isLoggedIn ? <SignUp /> : null}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</HelmetProvider>
		</ApolloProvider>
	);
}

export default App;
