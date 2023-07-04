// NOTE: use this component to wrap components that need to be animated

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedWrapperProps = {
	children: ReactNode;
};

const AnimatedWrapper = ({ children }: AnimatedWrapperProps) => {
	return (
		<motion.div
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedWrapper;
