import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { postLogin } from '../../services/auth';
import { showErrorToast } from '../../utils/toast';
import { useState } from 'react';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      email: data.email,
      password: data.password
    };
    postLogin({ payload })
    .then((res) => {
      setLoading(false)
      if(res.success) {
        if (res.data.role === 'admin' || res.data.role === 'nurse') {
          navigate('/admin');
        } else {
          navigate('/summary');
        }
      }
    })
    .catch((err) => {
      setLoading(false)
      showErrorToast(err.message);
    })
  };

  return (
    <div className="login-content pt-5 px-7 pb-10 text-black">
      <form onSubmit={handleSubmit(onSubmit)} id="login-form">
        <div className="grid mb-5 form-group">
          <label htmlFor="email" className="mb-2 font-semibold text-[#333333]">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email')}
            placeholder="Enter your email"
            className="block w-full rounded border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="grid mb-5 form-group">
          <label htmlFor="password" className="mb-2 font-semibold text-[#333333]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password')}
            placeholder="Enter your password"
            className="block w-full rounded border border-gray-300 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2a6eb8] cursor-pointer'
          } w-full p-3 font-medium text-white rounded-md`}
          id="login-btn"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <div className="loading" id="loading">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="error-message" id="error-message"></div>
        <div className="success-message" id="success-message"></div>
      </form>
      <div className="divider text-center text-[#999999] text-sm my-8">
        <div className="divider-line"></div>
        <div className="divider-text">Medical Staff Only</div>
        <div className="divider-line"></div>
      </div>
    </div>
  );
};

export default LoginForm;