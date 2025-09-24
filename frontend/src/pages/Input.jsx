import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components';
import { handleCreateUrl } from '../features/urlSlice.js';
import { useNavigate } from 'react-router-dom';

function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

const Input = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, data } = useSelector((state) => state.url);
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedUrl = normalizeUrl(longUrl);
    try {
      const result = await dispatch(handleCreateUrl({ longUrl: normalizedUrl })).unwrap();
      navigate('/output');
      // console.log('handleCreateUrl result:', result);
      setLongUrl(''); // Clear input on success
    } catch (err) {
      console.error('URL shortening failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 text-white rounded-lg shadow-lg p-8 py-15 space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Shorten Your URL</h1>
          <p className="text-sm text-gray-300">Paste your long URL below to generate a short link</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}


        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Example: https://www.example.com"
          className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          disabled={loading}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Short URL'}
        </Button>
      </form>
    </div>
  );
};

export default Input;
