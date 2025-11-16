import { Button } from '../components';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    
    return (
        <div className='flex flex-col gap-y-4 align-middle justify-center px-15 min-h-screen py-12'>
            <div className='flex flex-col  align-middle gap-y-3 text-white '>
                <h1 className='text-5xl font-bold'>Shorten, Share & Simplify Your Links</h1>
                <p className='text-lg font-light'>Transform long and messy URLs into short, easy-to-share links in seconds.
                    Manage your links effortlessly, track clicks, and make your online sharing smarter and cleaner.</p>
            </div>
            <div className='flex gap-x-5 gap-y-3'>
                <Button className='max-w-md' onClick={() => navigate('/login')}>Login</Button>
                <Button className='max-w-md' onClick={() => navigate('/signup')}>Signup</Button>
            </div>
        </div>
    );
}

export default Home;
