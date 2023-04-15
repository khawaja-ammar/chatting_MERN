import { useEffect, useState } from 'react';

const PREFIX = 'chatting-app-';

function useLocalStorage(key, initialValue = null) {
	const prefixedKey = PREFIX + key;

	// FOR getting the value from local storage
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);

		if (jsonValue != null) {
			try {
				return JSON.parse(jsonValue);
			} catch {
				return initialValue;
			}
		}
		if (typeof initialValue === 'function') return initialValue();

		return initialValue;
	});

	// FOR saving our key to local storage
	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
	}, [prefixedKey, value]);

	return [value, setValue];
}

export default useLocalStorage;
