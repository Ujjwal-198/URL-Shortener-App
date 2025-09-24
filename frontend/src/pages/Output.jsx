import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';

const Output = () => {
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.url);

    const handleCopy = () => {
        if (data?.ShortId) {
            navigator.clipboard.writeText(data.ShortId);
            alert('Short URL copied to clipboard!');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-full max-w-lg bg-gray-900 text-white rounded-lg shadow-lg p-8 py-15 space-y-3">

                <p className='text-xl font-semibold mb-5'>Your shortened URL is Ready!</p>
                <p className='text-sm font-light'>Click of shortened URL below to open in new tab</p>
                <div className='flex space-x-2'>
                    <input
                        value={data?.ShortId || ''}
                        onClick={() => {
                            if (data?.ShortId) {
                                window.open(data.ShortId, '_blank', 'noopener,noreferrer')
                            }
                        }}
                        readOnly
                        disabled={!data}
                        className="w-full cursor-pointer px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />

                    <Button
                        onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
                    >
                        Copy
                    </Button>
                </div>

                <div className='flex flex-col gap-y-2'>
                    {data && <p className='text-sm text-gray-300 mb-4 w-md overflow-hidden'>Long URL : {data.LongURL}</p>}
                    <Button
                        onClick={() => navigate('/input')}
                        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
                    >
                        Create Another Short URL
                    </Button>
                </div>


            </div>
        </div>
    );
}

export default Output;
