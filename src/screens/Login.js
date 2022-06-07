import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
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
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";

const LOGIN_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
`;

function Login() {
	const location = useLocation();
	console.log(location);
	const {
		register,
		handleSubmit,
		formState,
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			username: location?.state?.username || "",
			password: location?.station?.password || "",
		},
	});
	const onCompleted = (data) => {
		const {
			login: { ok, error, token },
		} = data;
		if (!ok) {
			return setError("result", {
				message: error,
			});
		}
		if (token) {
			logUserIn(token);
		}
	};
	const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
	const onSubmitValid = (data) => {
		const { username, password } = getValues();
		if (loading) {
			return;
		}
		login({
			variables: { username, password },
		});
	};

	const clearLoginError = () => {
		clearErrors("result");
	};

	return (
		<AuthLayout>
			<PageTitle title="Login" />
			<FormBox>
				<div>
					<FontAwesomeIcon icon={faCoffee} size="3x" />
				</div>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input
						{...register("username", {
							required: "Username is required",
							minLength: {
								value: 5,
								message: "Username should be longer than 5 chars.",
							},
							onChange() {
								clearLoginError();
							},
						})}
						type="text"
						placeholder="Username"
						hasError={Boolean(formState.errors?.username?.message)}
					/>
					<FormError message={formState.errors?.username?.message} />
					<Input
						{...register("password", {
							required: "Password is required.",
							onChange() {
								clearErrors("result");
							},
						})}
						type="password"
						placeholder="Password"
						hasError={Boolean(formState.errors?.password?.message)}
					/>
					<FormError message={formState.errors?.password?.message} />
					<Button
						type="submit"
						value={loading ? "Loading..." : "Log in"}
						disabled={!formState.isValid || loading}
					/>
					<FormError message={formState.errors?.result?.message} />
				</form>
			</FormBox>
			<BottomBox
				cta="Don't have an account?"
				link={routes.signUp}
				linkText="Sign up"
			/>
		</AuthLayout>
	);
}
export default Login;
