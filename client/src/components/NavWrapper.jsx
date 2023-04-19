import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeProvider';
import { useAuth } from '../contexts/AuthProvider';

export default function NavWrapper() {
    const { darkMode, setDarkMode } = useDarkMode();
    const location = useLocation().pathname;

    const { auth } = useAuth();
    const displayName = auth.userID;

    console.log('NAV', auth);

    return (
        <>
            <nav className="navbar z-10 min-h-[5vh] bg-base-300">
                <div className="navbar-start">
                    <p className="text-xl max-sm:text-sm">Chatting App</p>
                </div>

                <div className="navbar-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                    </svg>

                    <input
                        type="checkbox"
                        className="toggle"
                        onClick={() => {
                            setDarkMode((prev) => !prev);
                        }}
                        checked={darkMode}
                        readOnly
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                    </svg>
                </div>

                <div className="navbar-end max-sm:text-sm">
                    {location === '/register' ? (
                        <Link to="/login" className="link">
                            <p>Log In</p>
                        </Link>
                    ) : location === '/login' ? (
                        <></>
                    ) : location === '/signout' ? (
                        <Link to="/login" className="link">
                            <p>Log In</p>
                        </Link>
                    ) : (
                        <>
                            <p>
                                <span>{`Signed In as ${displayName}`}</span>{' '}
                                <Link to="/signout" className="link">
                                    <span>Sign Out</span>
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
