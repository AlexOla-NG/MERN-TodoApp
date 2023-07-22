// NOTE: use this component to wrap components that need to be animated

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedWrapperProps = {
	children: ReactNode;
	className?: string;
};

const AnimatedWrapper = ({ children, className }: AnimatedWrapperProps) => {
	return (
		<motion.div
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -300, opacity: 0 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedWrapper;
