import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock check (replace with real API check if needed)
    if (username.trim() && password.trim()) {
      login(username);
      navigate('/dashboard');
    } else {
      setError('Username and password are required.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
      )}

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Username
      </label>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring"
        required
      />

      <button
        type="submit"
        className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
