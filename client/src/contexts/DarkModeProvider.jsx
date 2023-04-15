import { useContext, useEffect, useState, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const darkModeContext = createContext();

export function useDarkMode() {
	return useContext(darkModeContext);
}

export function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(() => {
		return false;
	});

	const [pref, setPref] = useLocalStorage('color-scheme');

	function changeMode(e) {
		if (e.matches) {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	}

	useEffect(() => {
		if (pref == null) {
			if (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				setDarkMode(true);
			}
		} else if (pref == true) {
			setDarkMode(true);
		}

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => changeMode(e));

		return () => {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', (e) => changeMode(e));
		};
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.querySelector('html').setAttribute('data-theme', 'dracula');
			setPref(true);
		} else {
			document.querySelector('html').setAttribute('data-theme', 'light');
			setPref(false);
		}
	}, [darkMode]);

	return (
		<darkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</darkModeContext.Provider>
	);
}
