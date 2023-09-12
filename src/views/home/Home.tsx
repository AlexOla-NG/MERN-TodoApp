import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";
import TodoCardListControls from "./components/TodoCardListControls";

import { useGetDBTodos } from "../../hooks/home";
import { extractFullNames } from "../../utils";

// TODO: setup sorting logic

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
	const [currentItems, setCurrentItems] = useState<dbTodoProps[]>([]);
	const [itemOffset, setItemOffset] = useState(0);
	const { data, isSuccess, isLoading } = useGetDBTodos();
	const [sortType, setSortType] = useState<"asc" | "desc">("asc"); // 'asc' or 'desc'
	const [filterValue, setFilterValue] = useState("");

	// STUB: pagination
	const limit = 10; // How many items to display per page.
	const pageCount = Math.ceil(fileteredTodos?.length / limit);

	// STUB: set todos on page render
	useEffect(() => {
		if (isSuccess) setDBTodos(data);
	}, [isSuccess, data]);

	// STUB: set filtered on page render
	useEffect(() => {
		if (dbTodos.length > 0) setFilteredTodos(dbTodos);

	}, [dbTodos]);

	// STUB: set current items on page render
	// TODO: do we need to memoize currentItems value?
	useEffect(() => {
		if (fileteredTodos.length > 0) {
			const endOffset = itemOffset + limit;
			setCurrentItems(fileteredTodos?.slice(itemOffset, endOffset));
		}
	}, [fileteredTodos, isSuccess, itemOffset]);

	// STUB: set current items on sort change
	// const sortDBTodos = (sortType: "asc-title" | "desc-title" | "asc-time" | "desc-time") => {
	// 	if(sortType === "asc-title" || sortType ==="desc-title") {

	// 	}
	// }

	// Apply sorting logic to your data array
	// const sortedData = [...dbTodos].sort((a, b) => {
	// 	if (sortType === "asc") {
	// 		// Implement your sorting logic here
	// 	} else if (sortType === "desc") {
	// 		// Implement your sorting logic here
	// 	}
	// });

	/**
	 * filtering logic
	 * @param option string
	 * @returns void
	 */
	const filterData = (option: string) => {
		setItemOffset(0);
		// STUB: filter by all
		if (option === "all") {
			return setFilteredTodos(dbTodos);
		}

		// STUB: filter by status
		if (statusOptions.includes(option)) {
			const filteredStatus = dbTodos.filter(
				(elem) => elem.status === option
			);
			return setFilteredTodos(filteredStatus);
		}

		// STUB: filter by user
		if (extractFullNames(dbTodos).includes(option)) {
			const filteredUser = dbTodos.filter(
				(elem) => elem.user.fullname === option
			);
			return setFilteredTodos(filteredUser);
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
