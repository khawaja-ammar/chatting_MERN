import React from 'react';
import { Outlet } from 'react-router-dom';
import NavWrapper from './components/NavWrapper';

export default function Layout() {
	return (
		<>
			{/*NAVBAR || HEADER  */}
			<NavWrapper />
			<main>
				<Outlet />
			</main>
			{/*FOOTER */}
		</>
	);
}
