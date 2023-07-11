import React, { useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import { TokenSchema } from "./interface";
import Register from "./components/Register";
import Login from "./components/Login";

// TODO: stopped here
// setup register & login components

const Auth = ({ handleTokenUpdate }: TokenSchema) => {
	const [pageView, setPageView] = useState("login");

	const toggleView = () => {
		setPageView(pageView === "login" ? "register" : "login");
	};

	return (
		<AnimatedWrapper>
			{pageView === "register" && <Register toggleView={toggleView} />}
			{pageView === "login" && <Login toggleView={toggleView} />}
		</AnimatedWrapper>
	);
};

export default Auth;
