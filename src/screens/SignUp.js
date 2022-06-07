import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
	mutation createAccount(
		$name: String!
		$email: String!
		$username: String!
		$password: String!
	) {
		createAccount(
			name: $lastName
			email: $email
			username: $username
			password: $password
		) {
			ok
			error
		}
	}
`;

function SignUp() {
	const navigate = useNavigate();
	const onCompleted = (data) => {
		const { username, password } = getValues();
		const {
			createAccount: { ok },
		} = data;
		if (!ok) {
			return;
		}
		navigate(routes.home, {
			message: "Account created. Please log in. ",
			username,
			password,
		});
	};
	const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
		onCompleted,
	});
	const { register, handleSubmit, formState, getValues } = useForm({
		mode: "onChange",
	});
	const onSubmitValid = (data) => {
		if (loading) {
			return;
		}
		createAccount({
			variables: {
				...data,
			},
		});
	};
	return (
		<AuthLayout>
			<PageTitle title="Sign up" />
			<FormBox>
				<HeaderContainer>
					<FontAwesomeIcon icon={faCoffee} size="3x" />
				</HeaderContainer>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input
						{...register("name", { required: true })}
						type="text"
						placeholder="Name"
					/>
					<FormError message={formState.errors?.name?.message} />
					<Input
						{...register("email", {
							required: "Email is required.",
						})}
						type="text"
						placeholder="Email"
					/>
					<FormError message={formState.errors?.email?.message} />
					<Input
						{...register("username", {
							required: "Username is required.",
						})}
						type="text"
						placeholder="Username"
					/>
					<FormError message={formState.errors?.username?.message} />
					<Input
						{...register("password", {
							required: "Password is required.",
						})}
						type="password"
						placeholder="Password"
					/>
					<FormError message={formState.errors?.password?.message} />
					<Button
						type="submit"
						value={loading ? "Loading..." : "Sign Up"}
						disabled={!formState.isValid || loading}
					/>
				</form>
			</FormBox>
			<BottomBox
				cta="Have an account?"
				link={routes.home}
				linkText="Log in"
			/>
		</AuthLayout>
	);
}
export default SignUp;
