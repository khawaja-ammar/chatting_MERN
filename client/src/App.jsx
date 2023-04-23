import { Outlet, Route, Routes } from 'react-router-dom';
// import './App.css';

// import { useAuth } from './contexts/AuthProvider';

import RequireAuth from './components/RequireAuth';

import NavWrapper from './components/NavWrapper';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Signout from './components/Signout';

function App() {
    // const val = useAuth();

    // console.log(val.auth);
    // val.setAuth(true);
    // console.log(val);
    // val.setAuth(true);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* PUBLIC */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Logout />} />
                <Route path="signout" element={<Signout />} />

                {/* PRIVATE ROUTES */}
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>

                {/* <Route path='*' element={<Page404 />} /> */}
            </Route>
        </Routes>
    );
}

function Layout() {
    return (
        <>
            <div className="flex h-screen flex-col">
                {/*NAVBAR || HEADER  */}
                <NavWrapper />

                {/*Main Outlet */}
                <main className="flex-1">
                    <Outlet />
                </main>

                {/* <p>Hi</p> */}

                {/*FOOTER */}
            </div>
        </>
    );
}

export default App;
