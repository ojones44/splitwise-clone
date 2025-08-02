import { useEffect, useState } from 'react';
import { useAuthStore } from '../context/useAuthStore';
import { useNavigate } from 'react-router';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../utils/regex';
import { AuthenticateEndpoint, LoginFormData } from '../types/interfaces';
import { Col, FormGroup, Row, Button, Form, InputGroup } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { sleep } from '../utils/sleep';

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);

	const [formData, setFormData] = useState<LoginFormData>({
		name: {
			value: '',
			isValid: false,
		},
		email: {
			value: '',
			isValid: false,
		},
		password: {
			value: '',
			isValid: false,
			type: 'password',
		},
		confirmPassword: {
			value: '',
			isValid: false,
			type: 'password',
		},
	});

	const type = isLogin ? 'Login' : 'Register';
	const { authenticate } = useAuthStore();
	const navigate = useNavigate();
	const isFormNotSubmittable = () => {
		if (isLogin) return !formData.email.isValid || !formData.password.isValid;

		if (!isLogin) {
			return (
				!formData.name.isValid ||
				!formData.email.isValid ||
				!formData.password.isValid ||
				!formData.confirmPassword?.isValid
			);
		}
	};

	const isDisabled = isFormNotSubmittable();
	const passwordIsShown = (name: keyof LoginFormData) => {
		setFormData((prevData: LoginFormData) => ({
			...prevData,
			[name]: {
				...prevData[name as keyof LoginFormData],
				type:
					prevData[name as keyof LoginFormData]?.type === 'password'
						? 'text'
						: 'password',
			},
		}));
	};

	useEffect(() => {
		const isValidPassword = PASSWORD_REGEX.test(formData.password.value);

		setFormData((prevData) => ({
			...prevData,
			password: {
				...prevData.password,
				isValid: isValidPassword,
				errorMessage: isValidPassword
					? ''
					: `Password must be at least 8 characters long
            and contain at least one uppercase letter, one lowercase letter
            one number, and one special character.`,
			},
		}));
	}, [formData.password.value]);

	useEffect(() => {
		if (isLogin) return;

		const passwordsMatched =
			formData.password.value === formData.confirmPassword?.value;

		setFormData((prevData) => ({
			...prevData,
			confirmPassword: {
				...prevData.confirmPassword!,
				isValid: passwordsMatched,
				errorMessage: passwordsMatched ? '' : `Passwords do not match`,
			},
		}));
	}, [formData.password.value, formData.confirmPassword?.value, isLogin]);

	useEffect(() => {
		const isValidEmail = EMAIL_REGEX.test(formData.email.value);

		setFormData((prevData) => ({
			...prevData,
			email: {
				...prevData.email,
				isValid: isValidEmail,
				errorMessage: isValidEmail ? '' : 'Please enter a valid email',
			},
		}));
	}, [formData.email.value]);

	const validateName = () => {
		const isValidName = !!formData.name.value;

		setFormData((prevData: LoginFormData) => ({
			...prevData,
			name: {
				...prevData.name,
				isValid: isValidName,
				errorMessage: isValidName ? '' : 'Please enter a name',
			},
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData: LoginFormData) => ({
			...prevData,
			[name]: {
				...prevData[name as keyof LoginFormData],
				value,
			},
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const promise = async () => {
			await sleep(1);
			await authenticate(
				{
					...(!isLogin ? { name: formData.name?.value } : {}),
					email: formData.email.value,
					password: formData.password.value,
				},
				type.toLowerCase() as AuthenticateEndpoint
			);

			navigate('/');
		};

		toast.promise(promise, {
			pending: 'Authenticating',
			success: 'Taking you to the homepage!',
			error: {
				render({ data }) {
					return data?.message;
				},
			},
		});
	};

	return (
		<div className='w-50 mx-auto'>
			<h1 className='my-4'>{type} Page</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup className='mb-3' controlId='formBasicName'>
					{!isLogin && (
						<>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								value={formData.name.value}
								name='name'
								onChange={handleChange}
								onBlur={validateName}
								placeholder='Enter Your Name'
							/>
							{formData.name.errorMessage && (
								<Form.Text className='text-danger'>
									{formData.name.errorMessage}
								</Form.Text>
							)}
						</>
					)}
				</FormGroup>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						value={formData.email.value}
						name='email'
						placeholder='Enter email'
						onChange={handleChange}
					/>
					{!formData.email.isValid && formData.email.value && (
						<Form.Text className='text-danger'>
							{formData.email.errorMessage}
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<InputGroup>
						<Form.Control
							type={formData.password.type}
							value={formData.password.value}
							name='password'
							onChange={handleChange}
							placeholder='Enter Password'
						/>
						<Button
							onClick={() => passwordIsShown('password')}
							variant='outline-secondary'
							id='button-addon2'
						>
							{formData.password.type === 'password' ? (
								<FaRegEye />
							) : (
								<FaRegEyeSlash />
							)}
						</Button>
					</InputGroup>
					{!formData.password.isValid && formData.password.value && (
						<Form.Text className='text-danger'>
							{formData.password.errorMessage}
						</Form.Text>
					)}
				</Form.Group>

				<FormGroup className='mb-3' controlId='formBasicConfirmPassword'>
					{!isLogin && (
						<>
							<Form.Label>Confirm Password</Form.Label>
							<InputGroup>
								<Form.Control
									type={formData.confirmPassword?.type}
									value={formData.confirmPassword?.value}
									name='confirmPassword'
									onChange={handleChange}
									placeholder='Re-enter Password'
								/>
								<Button
									onClick={() => passwordIsShown('confirmPassword')}
									variant='outline-secondary'
									id='button-addon2'
								>
									{formData.confirmPassword?.type === 'password' ? (
										<FaRegEye />
									) : (
										<FaRegEyeSlash />
									)}
								</Button>
							</InputGroup>
							{!formData.confirmPassword?.isValid &&
								formData.confirmPassword?.value && (
									<Form.Text className='text-danger'>
										{formData.confirmPassword?.errorMessage}
									</Form.Text>
								)}
						</>
					)}
				</FormGroup>

				<Row>
					<Col>
						<Button variant='primary' type='submit' disabled={isDisabled}>
							{type}
						</Button>
					</Col>
					<Col className='text-end'>
						<p onClick={() => setIsLogin(!isLogin)}>
							{isLogin ? 'Not registered yet?' : 'Already registered?'}
						</p>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
export default Login;
