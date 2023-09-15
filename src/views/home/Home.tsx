import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";
import TodoCardListControls from "./components/TodoCardListControls";

import { useGetDBTodos } from "../../hooks/home";
import { extractFullNames } from "../../utils";

// TODO: refactor code
// replace usestate with usereducer

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

// STUB: custom type for state
interface AppState {
	dbTodos: dbTodoProps[];
	sortedTodos: dbTodoProps[];
	fileteredTodos: dbTodoProps[];
	currentItems: dbTodoProps[];
	itemOffset: number;
}

// STUB: interface for dispatch actions
type SetDBTodos = { type: "SET_DB_TODOS"; payload: dbTodoProps[] };
type SetCurrentPageItems = {
	type: "SET_CURRENT_PAGE_ITEMS";
	payload: { itemOffset: number; endOffset: number };
};
type UpdatePage = {
	type: "UPDATE_PAGE";
	payload: { selected: number; limit: number };
};
type SetTodosAscTitle = { type: "SET_TODOS_ASC_TITLE" };
type SetTodosDescTitle = { type: "SET_TODOS_DESC_TITLE"};
type SetTodosAscTime = { type: "SET_TODOS_ASC_TIME"};
type SetTodosDescTime = { type: "SET_TODOS_DESC_TIME"};
type SetFilterAllTodos = { type: "SET_FILTER_ALL_TODOS"};
type SetFilterByStatus = { type: "SET_FILTER_BY_STATUS"; payload: string };
type SetFilterByUser = { type: "SET_FILTER_BY_USER"; payload: string };

type AppActions =
	| SetDBTodos
	| SetCurrentPageItems
	| UpdatePage
	| SetTodosAscTitle
	| SetTodosDescTitle
	| SetTodosAscTime
	| SetTodosDescTime
	| SetFilterAllTodos
	| SetFilterByStatus
	| SetFilterByUser;

function appReducer(state: AppState, action: AppActions) {
	switch (action.type) {
		case "SET_DB_TODOS":
			return { ...state, dbTodos: action.payload };
		case "SET_CURRENT_PAGE_ITEMS":
			return {
				...state,
				currentItems: state.fileteredTodos.slice(
					action.payload.itemOffset,
					action.payload.endOffset
				),
			};
		case "UPDATE_PAGE":
			return {
				...state,
				itemOffset: (action.payload.selected * action.payload.limit) % state.fileteredTodos?.length
			};
		case "SET_TODOS_ASC_TITLE":
			return {
				...state,
				sortedTodos: state.sortedTodos.sort((a, b) =>
					a.title.localeCompare(b.title)
				),
			};
		case "SET_TODOS_DESC_TITLE":
			return {
				...state,
				sortedTodos: state.sortedTodos.sort((a, b) =>
					b.title.localeCompare(a.title)
				),
			};
		case "SET_TODOS_ASC_TIME":
			return {
				...state,
				sortedTodos: state.sortedTodos.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SET_TODOS_DESC_TIME":
			return {
				...state,
				sortedTodos: state.sortedTodos.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SET_FILTER_ALL_TODOS":
			return {
				...state,
				fileteredTodos: state.sortedTodos,
			};
		case "SET_FILTER_BY_STATUS":
			return {
				...state,
				fileteredTodos: state.sortedTodos.filter(
					(elem) => elem.status === action.payload
				),
			};
		case "SET_FILTER_BY_USER":
			return {
				...state,
				fileteredTodos: state.sortedTodos.filter(
					(elem) => elem.user.fullname === action.payload
				),
			};
		default:
			return state;
	}
}

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
		if (isSuccess) setDBTodos(data); //dispatch type: SET_DB_TODOS
	}, [isSuccess, data]);

	// STUB: set sorted on page render
	useEffect(() => {
		if (dbTodos.length > 0) sortData("asc-title");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbTodos]);

	// STUB: set filtered on page render
	useEffect(() => {
		if (sortedTodos.length > 0) setFilteredTodos(sortedTodos); //dispatch type: SET_FILTER_ALL_TODOS
	}, [sortedTodos]);

	// STUB: set current items on page render
	// TODO: do we need to memoize currentItems value?
	useEffect(() => {
		if (fileteredTodos.length > 0) {
			// dispatch type: SET_CURRENT_PAGE_ITEMS, payload: { itemOffset, endOffset }

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
		// dispatch type: SET_FILTER_ALL_TODOS

		if (option === "all") {
			return setFilteredTodos(sortedTodos);
		}

		// STUB: filter by status
		// dispatch type: SET_FILTER_BY_STATUS, payload: option

		if (statusOptions.includes(option)) {
			const filteredStatus = sortedTodos.filter(
				(elem) => elem.status === option
			);
			return setFilteredTodos(filteredStatus);
		}

		// STUB: filter by user
		// dispatch type: SET_FILTER_BY_USER, payload: option

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
			// dispatch type: SET_TODOS_ASC_TITLE

			sortedData.sort((a, b) => a.title.localeCompare(b.title));
			setSortedTodos(sortedData);
		}
		
		if (option === "desc-title") {
			// dispatch type: SET_TODOS_DESC_TITLE

			sortedData.sort((a, b) => b.title.localeCompare(a.title));
			setSortedTodos(sortedData);
		}

		// STUB: sort by time created
		if (option === "asc-time") {
			// dispatch type: SET_TODOS_ASC_TIME

			sortedData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
			setSortedTodos(sortedData);
		}
		
		if (option === "desc-time") {
			// dispatch type: SET_TODOS_DESC_TIME

			sortedData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
			setSortedTodos(sortedData);
		}
	};

	// STUB: Invoke when user click to request another page.
	const handlePageClick = (selectedItem: { selected: number }) => {
		// dispatch type: UPDATE_PAGE, payload: { selected, limit }

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
					sortData={sortData}
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
