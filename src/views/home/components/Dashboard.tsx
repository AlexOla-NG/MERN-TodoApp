import React, { useState } from "react";
import StatCard from "./StatCard";
import { dbTodoProps } from "../Home";
import { filterByStatus, getUserTitleCount } from "../../../utils";

// TODO: stopped here
// style dashboard

type dashboardProps = {
	dbTodos: dbTodoProps[];
	isLoading: boolean;
};

export type UserTitleCount = {
	value: number;
	name: string;
};

const Dashboard = ({ dbTodos }: dashboardProps) => {

	return (
		<div className="dashboard">
			<StatCard todos={getUserTitleCount(dbTodos)} title="total todos" />
			<StatCard
				todos={getUserTitleCount(filterByStatus(dbTodos, 'active'))}
				title="active todos"
			/>
			<StatCard
				todos={getUserTitleCount(filterByStatus(dbTodos, 'completed'))}
				title="completed todos"
			/>
		</div>
	);
};

export default Dashboard;
