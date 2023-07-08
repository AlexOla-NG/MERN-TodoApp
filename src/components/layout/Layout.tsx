// NOTE: layout component renders the background image of each page

import React, { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return <div className="layout-container">{children}</div>;
};

export default Layout;
