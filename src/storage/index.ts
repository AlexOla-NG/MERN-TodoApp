export type UserID = string | boolean;

export type Token = string | boolean;

export function getStoredUser(): UserID | undefined {
	const storedUser = localStorage.getItem("userID");
	return storedUser ? JSON.parse(storedUser) : undefined;
}

export function setStoredUser(userID: unknown): void {
	localStorage.setItem("userID", JSON.stringify(userID));
}

// STUB: save login token to local storage
export function setLoginToken(token: unknown): void {
	localStorage.setItem("token", JSON.stringify(token));
}

// STUB: get login token from local storage
export function getLoginToken(): Token | null {
	const storedToken = localStorage.getItem("token");
	return storedToken ? JSON.parse(storedToken) : null;
}

// STUB: remove login token from local storage
export function removeLoginToken() {
	localStorage.removeItem("token");
}

// STUB: remove login token from local storage
export function removeUserID() {
	localStorage.removeItem("userID");
}
