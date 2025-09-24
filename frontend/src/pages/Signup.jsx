import { useForm } from 'react-hook-form';
import { Button } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { handleSignup } from '../features/userSlice.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const dispatch = useDispatch();
  const { user, authenticated, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(null);

  useEffect(() => {
    if (authenticated) {
      navigate('/input');
    }
    if (error) {
      console.error('Signup error:', error);
    }
  }, [authenticated, user, navigate, error]);

  const onSubmit = async (data) => {
    try {
      await dispatch(handleSignup(data)).unwrap();
    } catch (err) {
      setDisplayError(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Signup</h1>

        <div className="flex flex-col gap-y-1">
          <label className="text-white">Username</label>
          <input
            className="text-md text-white rounded-md w-full py-2 px-3 border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="John Doe"
            type="text"
            {...register("name", {
              required: "Username is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="text-white">Email</label>
          <input
            className="text-md text-white rounded-md w-full py-2 px-3 border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="example@email.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="text-white">Password</label>
          <input
            className="text-md text-white rounded-md w-full py-2 px-3 border border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {displayError && (
          <p className="text-sm text-red-500 text-center">{displayError}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
        >
          {loading ? "Signing up..." : "Signup"}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
