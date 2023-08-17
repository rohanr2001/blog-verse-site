import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useUser() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			setUser(user);
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return { user, isLoading };
}
