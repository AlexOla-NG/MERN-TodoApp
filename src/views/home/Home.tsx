import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";

import { useGetDBTodos, useGetDBTodosStats } from "../../hooks/home";

type user = {
	_id: string;
	id: string;
	fullname: string;
}

export type dbTodoProps = {
	createdAt: string;
	description?: string;
	status: string;
	title: string;
	user: user;
	_id: string;
	_v: number;
}

// TODO: stopped here
// implement react paginate

const Home = () => {
	const [dbTodos, setDBTodos] = useState<dbTodoProps[]>([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [dbTodoStats, setDBTodoStats] = useState<dbTodoProps[]>([]);
	const {
		data: todoCardListTodos,
		isSuccess,
		isLoading,
		mutate,
	} = useGetDBTodos();
	const {
		data: stats,
		isSuccess: isSuccessStats,
		isLoading: isLoadingStats,
	} = useGetDBTodosStats();
	const [sortType, setSortType] = useState<"asc" | "desc">("asc"); // 'asc' or 'desc'
	const [filterValue, setFilterValue] = useState("");

	// Apply sorting logic to your data array
	// const sortedData = [...dbTodos].sort((a, b) => {
	// 	if (sortType === "asc") {
	// 		// Implement your sorting logic here
	// 	} else if (sortType === "desc") {
	// 		// Implement your sorting logic here
	// 	}
	// });

	// Apply filtering logic to your data array
	// const filteredData = sortedData.filter((item) => {
	// 	// Implement your filtering logic here
	// });

	useEffect(() => {
		if (isSuccessStats) setDBTodoStats(stats);
	}, [isSuccessStats, stats]);

	useEffect(() => {
		mutate({ page, limit });
	}, [limit, mutate, page]);

	useEffect(() => {
		if (isSuccess) setDBTodos(todoCardListTodos?.data);
	}, [isSuccess, todoCardListTodos, page, limit]);


	const [itemOffset, setItemOffset] = useState(0);

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + limit;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = dbTodos?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(dbTodos?.length / limit);

	// Invoke when user click to request another page.
	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * limit) % dbTodos?.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	return (
		<AnimatedWrapper className="home">
			<Dashboard dbTodos={dbTodoStats} isLoading={isLoadingStats} />
			<TodoCardList dbTodos={currentItems} isLoading={isLoading} />
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>
		</AnimatedWrapper>
	);
};

export default Home;
