import {Header, Footer, Container, AboutModal, FirstTimePopup} from './components/index.js'
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
                <AboutModal />
            </Container>
            <FirstTimePopup />
            <Footer />
        </>
    );
}

export default Layout;
