import { darkModeVar } from "../apollo";
import styled from "styled-components";

const Title = styled.h1`
	color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;

function Login() {
	return (
		<Container>
			<Title>LOGIN</Title>
			<button onClick={() => darkModeVar(true)}>Dark</button>
			<button onClick={() => darkModeVar(false)}>Light</button>
		</Container>
	);
}

export default Login;
