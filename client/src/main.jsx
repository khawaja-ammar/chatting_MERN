import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import { DarkModeProvider } from './contexts/DarkModeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<DarkModeProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</DarkModeProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
