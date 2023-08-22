import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import StatCard from "./StatCard";
import { dbTodoProps } from "../Home";
import { filterByStatus, getUserTitleCount } from "../../../utils";

type dashboardProps = {
	dbTodos: dbTodoProps[];
	isLoading: boolean;
};

export type UserTitleCount = {
	value: number;
	name: string;
};

const Dashboard = ({ dbTodos, isLoading }: dashboardProps) => {
	return (
		<div className="dashboard">
			{isLoading ? (
				<Skeleton
					baseColor="#202020"
					highlightColor="#444"
					height="255px"
					width="235px"
				/>
			) : (
				<StatCard
					todos={getUserTitleCount(dbTodos)}
					title="total todos"
				/>
			)}
			{isLoading ? (
				<Skeleton
					baseColor="#202020"
					highlightColor="#444"
					height="255px"
					width="235px"
				/>
			) : (
				<StatCard
					todos={getUserTitleCount(filterByStatus(dbTodos, "active"))}
					title="active todos"
				/>
			)}
			{isLoading ? (
				<Skeleton
					baseColor="#202020"
					highlightColor="#444"
					height="255px"
					width="235px"
				/>
			) : (
				<StatCard
					todos={getUserTitleCount(
						filterByStatus(dbTodos, "completed")
					)}
					title="completed todos"
				/>
			)}
		</div>
	);
};

export default Dashboard;
