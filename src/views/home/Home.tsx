import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";
import TodoCardListControls from "./components/TodoCardListControls";

import { useGetDBTodos } from "../../hooks/home";
import { extractFullNames } from "../../utils";

// TODO: refactor code
// utilize useReducer to manage state, dispatch actions
// useState manages individual items, useReducer manages entire state

type user = {
	_id: string;
	id: string;
	fullname: string;
};

export type dbTodoProps = {
	createdAt: string;
	description?: string;
	status: string;
	title: string;
	user: user;
	_id: string;
	_v: number;
};

const statusOptions = ["all", "completed", "active"];

const Home = () => {
	const [dbTodos, setDBTodos] = useState<dbTodoProps[]>([]);
	const [fileteredTodos, setFilteredTodos] = useState<dbTodoProps[]>([]);
	const [sortedTodos, setSortedTodos] = useState<dbTodoProps[]>([]);
	const [currentItems, setCurrentItems] = useState<dbTodoProps[]>([]);
	const [itemOffset, setItemOffset] = useState(0);
	const { data, isSuccess, isLoading } = useGetDBTodos();

	// STUB: pagination
	const limit = 10; // How many items to display per page.
	const pageCount = Math.ceil(fileteredTodos?.length / limit);

	// STUB: set todos on page render
	useEffect(() => {
		if (isSuccess) setDBTodos(data);
	}, [isSuccess, data]);

	// STUB: set sorted on page render
	useEffect(() => {
		if (dbTodos.length > 0) sortData("asc-title");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbTodos]);

	// STUB: set filtered on page render
	useEffect(() => {
		if (sortedTodos.length > 0) setFilteredTodos(sortedTodos);
	}, [sortedTodos]);

	// STUB: set current items on page render
	// TODO: do we need to memoize currentItems value?
	useEffect(() => {
		if (fileteredTodos.length > 0) {
			const endOffset = itemOffset + limit;
			setCurrentItems(fileteredTodos?.slice(itemOffset, endOffset));
		}
	}, [fileteredTodos, isSuccess, itemOffset]);

	/**
	 * filtering logic
	 * @param option string
	 */
	const filterData = (option: string) => {
		// STUB: reset itemOffset
		setItemOffset(0);
		// STUB: filter by all
		if (option === "all") {
			return setFilteredTodos(sortedTodos);
		}

		// STUB: filter by status
		if (statusOptions.includes(option)) {
			const filteredStatus = sortedTodos.filter(
				(elem) => elem.status === option
			);
			return setFilteredTodos(filteredStatus);
		}

		// STUB: filter by user
		if (extractFullNames(sortedTodos).includes(option)) {
			const filteredUser = dbTodos.filter(
				(elem) => elem.user.fullname === option
			);
			return setFilteredTodos(filteredUser);
		}
	};

	/**
	 * sorting logic
	 * @param option string
	 */
	// STUB: Function to sort the array by a specific property
	const sortData = (option: string) => {
		const sortedData = [...dbTodos];

		// STUB: sort by title
		if (option === "asc-title") {
			sortedData.sort(
				(a, b) => a.title.localeCompare(b.title)
			)
			setSortedTodos(sortedData);
		}
		
		if (option === "desc-title") {
			sortedData.sort(
				(a, b) => b.title.localeCompare(a.title)
			)
			setSortedTodos(sortedData);
		}

		// STUB: sort by time created
		if (option === "asc-time") {
			sortedData.sort(
				(a, b) => a.createdAt.localeCompare(b.createdAt)
			)
			setSortedTodos(sortedData);
		}
		
		if (option === "desc-time") {
			sortedData.sort(
				(a, b) => b.createdAt.localeCompare(a.createdAt)
			)
			setSortedTodos(sortedData);
		}
	};

	// STUB: Invoke when user click to request another page.
	const handlePageClick = (selectedItem: { selected: number }) => {
		const newOffset =
			(selectedItem.selected * limit) % fileteredTodos?.length;
		setItemOffset(newOffset);
	};

	return (
		<AnimatedWrapper className="home">
			<Dashboard dbTodos={dbTodos} isLoading={isLoading} />
			<section className="todo-list-card-wrapper">
				<TodoCardListControls
					users={extractFullNames(dbTodos)}
					filterData={filterData}
					sortData={sortData} //TODO: fix this
				/>
				<TodoCardList dbTodos={currentItems} isLoading={isLoading} />
				<ReactPaginate
					containerClassName={"pagination"}
					activeClassName={"active"}
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
				/>
			</section>
		</AnimatedWrapper>
	);
};

export default Home;
