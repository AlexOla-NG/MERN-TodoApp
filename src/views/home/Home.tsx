import React, { ChangeEvent, useEffect, useReducer } from "react";
import ReactPaginate from "react-paginate";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";
import TodoCardListControls from "./components/TodoCardListControls";

import { useGetDBTodos } from "../../hooks/home";
import { extractFullNames } from "../../utils";

// TODO: bug fix
// 1. whenever we change something and save, dbTodos is displayed on TodoCardList instead of currentItems
// I think it might be a bug with the useReducer/useEffect hook. Plz investigate
// 2. pagination does not reset whenever we filter todos

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
	filterOption: string;
	sortOption: string;
	dbTodos: dbTodoProps[];
	sortedTodos: dbTodoProps[];
	fileteredTodos: dbTodoProps[];
	currentItems: dbTodoProps[];
	itemOffset: number;
}

// STUB: interface for dispatch actions
type SetFilterOption = {type: 'SET_FILTER_OPTION', payload: string}
type SetSortOption = {type: 'SET_SORT_OPTION', payload: string}
type SetDBTodos = { type: "SET_DB_TODOS"; payload: dbTodoProps[] };
type SetCurrentPageItems = {
	type: "SET_CURRENT_PAGE_ITEMS";
	payload: { limit: number };
};
type UpdatePagination = {
	type: "UPDATE_PAGINATION";
	payload: { selected: number; limit: number };
};
type SortTodosByAscTitle = { type: "SORT_TODOS_BY_ASC_TITLE" };
type SortTodosByDescTitle = { type: "SORT_TODOS_BY_DESC_TITLE" };
type SortTodosByAscTime = { type: "SORT_TODOS_BY_ASC_TIME" };
type SortTodosByDescTime = { type: "SORT_TODOS_BY_DESC_TIME" };
type FilterAllTodos = { type: "FILTER_ALL_TODOS" };
type FilterByStatus = { type: "FILTER_BY_STATUS"; payload: string };
type FilterByUser = { type: "FILTER_BY_USER"; payload: string };

type AppActions =
	| SetFilterOption
	| SetSortOption
	| SetDBTodos
	| SetCurrentPageItems
	| UpdatePagination
	| SortTodosByAscTitle
	| SortTodosByDescTitle
	| SortTodosByAscTime
	| SortTodosByDescTime
	| FilterAllTodos
	| FilterByStatus
	| FilterByUser;

const initialstate: AppState = {
	filterOption: "all",
	sortOption: "asc-title",
	itemOffset: 0,
	dbTodos: [],
	sortedTodos: [],
	fileteredTodos: [],
	currentItems: [],
}


function appReducer(state: AppState, action: AppActions) {
	switch (action.type) {
		case "SET_FILTER_OPTION":
			return { ...state, filterOption: action.payload };
		case "SET_SORT_OPTION":
			return { ...state, sortOption: action.payload };
		case "SET_DB_TODOS":
			return { ...state, dbTodos: action.payload };
		case "SET_CURRENT_PAGE_ITEMS":
			return {
				...state,
				currentItems: state.sortedTodos.slice(
					state.itemOffset,
					(state.itemOffset + action.payload.limit)
				),
			};
		case "UPDATE_PAGINATION":
			return {
				...state,
				itemOffset:
					(action.payload.selected * action.payload.limit) %
					state.fileteredTodos?.length,
			};
		case "FILTER_ALL_TODOS":
			return {
				...state,
				fileteredTodos: state.dbTodos,
				itemOffset: 0, // reset pagination
			};
		case "FILTER_BY_STATUS":
			return {
				...state,
				fileteredTodos: state.dbTodos.filter(
					(elem) => elem.status === action.payload
					),
				itemOffset: 0, // reset pagination
			};
		case "FILTER_BY_USER":
			return {
				...state,
				fileteredTodos: state.dbTodos.filter(
					(elem) => elem.user.fullname === action.payload
					),
				itemOffset: 0, // reset pagination
				};
		case "SORT_TODOS_BY_ASC_TITLE":
			return {
				...state,
				sortedTodos: state.fileteredTodos.sort((a, b) =>
					a.title.localeCompare(b.title)
				),
			};
		case "SORT_TODOS_BY_DESC_TITLE":
			return {
				...state,
				sortedTodos: state.fileteredTodos.sort((a, b) =>
					b.title.localeCompare(a.title)
				),
			};
		case "SORT_TODOS_BY_ASC_TIME":
			return {
				...state,
				sortedTodos: state.fileteredTodos.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SORT_TODOS_BY_DESC_TIME":
			return {
				...state,
				sortedTodos: state.fileteredTodos.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		default:
			return state;
	}
}

const Home = () => {
	const [state, dispatch] = useReducer(appReducer, initialstate);
	const {currentItems, dbTodos, fileteredTodos, sortedTodos, itemOffset, filterOption, sortOption} = state
	const { data, isSuccess, isLoading } = useGetDBTodos();

	// STUB: pagination
	const limit = 10; // How many items to display per page.
	const pageCount = Math.ceil(fileteredTodos?.length / limit);

	// STUB: set todos on page render
	useEffect(() => {
		if (isSuccess) {
			dispatch({type: "SET_DB_TODOS", payload: data})
		}
		
	}, [isSuccess, data]);

	// STUB: set filtered on page render
	useEffect(() => {
		if (dbTodos.length > 0) {
			dispatch({type: "FILTER_ALL_TODOS"})
		}
	}, [dbTodos]);

	// STUB: set sorted on page render
	useEffect(() => {
		if (fileteredTodos.length > 0) {
			sortData(sortOption)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileteredTodos]);

	// STUB: set current items on page render
	useEffect(() => {
		if (sortedTodos.length > 0) {
			dispatch({
				type: "SET_CURRENT_PAGE_ITEMS",
				payload: { limit },
			});
		}

	}, [sortedTodos, sortOption, itemOffset]);

	/**
	 * filtering logic
	 * @param option string
	 */
	const filterData = (option: string) => {

		// STUB: filter by all
		if (option === "all") {
			return dispatch({type: "FILTER_ALL_TODOS"});
		}

		// STUB: filter by status
		if (statusOptions.includes(option)) {
			dispatch({type: "FILTER_BY_STATUS", payload: option});
		}

		// STUB: filter by user
		if (extractFullNames(dbTodos).includes(option)) {
			dispatch({type: "FILTER_BY_USER", payload: option});
		}
	};

	/**
	 * sorting logic
	 * @param option string
	 */
	// STUB: Function to sort the array by a specific property
	const sortData = (option: string) => {

		// STUB: sort by title
		if (option === "asc-title") {
			dispatch({type: 'SORT_TODOS_BY_ASC_TITLE'});
		}

		if (option === "desc-title") {
			dispatch({type: 'SORT_TODOS_BY_DESC_TITLE'});
		}

		// STUB: sort by time created
		if (option === "asc-time") {
			dispatch({type: 'SORT_TODOS_BY_ASC_TIME'});
		}

		if (option === "desc-time") {
			dispatch({type: 'SORT_TODOS_BY_DESC_TIME'});
		}
	};

	// STUB: Invoke when user click to request another page.
	const handlePageClick = (selectedItem: { selected: number }) => {
		dispatch({type: 'UPDATE_PAGINATION', payload: {selected:selectedItem.selected, limit}})
	};

	// STUB: handle filter onchange
	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({type: 'SET_FILTER_OPTION', payload: event.target.value})
		filterData(event.target.value);
	};

	// STUB: handle sort onchange
	const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({ type: "SET_SORT_OPTION", payload: event.target.value });
		sortData(event.target.value);
	};
	

	return (
		<AnimatedWrapper className="home">
			<Dashboard dbTodos={dbTodos} isLoading={isLoading} />
			<section className="todo-list-card-wrapper">
				<TodoCardListControls
					users={extractFullNames(dbTodos)}
					handleFilterChange={handleFilterChange}
					handleSortChange={handleSortChange}
					filterOption={filterOption}
					sortOption={sortOption}
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
