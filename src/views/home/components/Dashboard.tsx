import React, { useState } from "react";
import StatCard from "./StatCard";
import { dbTodoProps } from "../Home";
import { getUserTitleCount } from "../../../utils";

type dashboardProps = {
	dbTodos: dbTodoProps[];
	isLoading: boolean;
};

export type UserTitleCount = {
	fullname: string;
	count: number;
};

const Dashboard = ({ dbTodos }: dashboardProps) => {
  const [totalTodos, setTotalTodos] =
		useState<UserTitleCount[]>(getUserTitleCount(dbTodos));

	return (
		<div>
			<StatCard totalTodos={totalTodos} title='total todos' />;
		</div>
	);
};

export default Dashboard;
