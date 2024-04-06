/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocalStorage } from '@/hooks/useStorage';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const signinSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.min(3)
		.required(),
	password: Joi.string().min(6).required(),
});

const Signin = () => {
	const navigate = useNavigate();

	const [, setUser] = useLocalStorage('user', {});
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: joiResolver(signinSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { mutate } = useMutation({
		mutationFn: async (formData: { email: string; password: string }) => {
			try {
				const { data } = await axios.post(
					'http://localhost:8080/api/v1/auth/signin',
					formData
				);
				return data;
			} catch (error: any) {
				throw error.response.data;
			}
		},
		onSuccess: (data) => {
			setUser(data);
			navigate('/');
		},
		onError: (error: any) => {
			if (error.email) {
				setError('email', { message: error.email });
			}
			if (error.password) {
				setError('password', { message: error.password });
			}
		},
	});

	const onSubmit = (formData: { email: string; password: string }) => {
		mutate(formData);
	};
	return (
		<div className="flex justify-center">
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<input
					className="w-96 p-4 border"
					type="text"
					{...register('email', { required: true, minLength: 3 })}
					placeholder="Email"
				/>
				{errors.email && <p className="text-red-600">{errors.email.message}</p>}
				<input
					className="w-96 p-4 border mt-3"
					type="password"
					{...register('password', { required: true, minLength: 6 })}
					placeholder="Password"
				/>
				{errors.password && (
					<p className="text-red-600">{errors.password.message}</p>
				)}
				<button className="w-96 p-5 mt-3 hover:bg-zinc-700 hover:text-white">
					Đăng nhập
				</button>
			</form>
		</div>
	);
};

export default Signin;
