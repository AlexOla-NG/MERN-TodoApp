import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";
import TodoCardListControls from "./components/TodoCardListControls";

import { useGetDBTodos } from "../../hooks/home";
import { extractFullNames } from "../../utils";

// TODO: setup logic for sorting and filtering

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

const Home = () => {
	const [dbTodos, setDBTodos] = useState<dbTodoProps[]>([]);
	const [currentItems, setCurrentItems] = useState<dbTodoProps[]>([]);
	const [itemOffset, setItemOffset] = useState(0);
	const { data, isSuccess, isLoading } = useGetDBTodos();
	const [sortType, setSortType] = useState<"asc" | "desc">("asc"); // 'asc' or 'desc'
	const [filterValue, setFilterValue] = useState("");

	// STUB: pagination
	const limit = 10; // How many items to display per page.
	const pageCount = Math.ceil(dbTodos?.length / limit);

	// STUB: set todos on page render
	useEffect(() => {
		if (isSuccess) setDBTodos(data);
	}, [isSuccess, data]);

	// STUB: set current items on page render
	useEffect(() => {
		if (isSuccess) {
			const endOffset = itemOffset + limit;
			setCurrentItems(dbTodos?.slice(itemOffset, endOffset));
		}
	}, [dbTodos, isSuccess, itemOffset]);

	// STUB: set current items on sort change
	const sortDBTodos = (sortType: "asc-title" | "desc-title" | "asc-time" | "desc-time") => {
		if(sortType === "asc-title" || sortType ==="desc-title") {

		}
	}

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

	// STUB: Invoke when user click to request another page.
	const handlePageClick = (selectedItem: { selected: number }) => {
		const newOffset = (selectedItem.selected * limit) % dbTodos?.length;
		setItemOffset(newOffset);
	};

	return (
		<AnimatedWrapper className="home">
			<Dashboard dbTodos={dbTodos} isLoading={isLoading} />
			<section className="todo-list-card-wrapper">
				<TodoCardListControls users={extractFullNames(dbTodos)} />
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
