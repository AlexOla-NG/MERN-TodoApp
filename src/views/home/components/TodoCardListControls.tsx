import React from 'react'

// TODO: stopped here
// setup custom select for filter and sort

// TODO: add controls for filter, sort
// filter by status, user
// sort by ascending, descending order of title, time created

// TODO: create function that gets all users from todoDB

const TodoCardListControls = () => {
  return (
		<div className="todo-card-list-controls">
			<label htmlFor="filter">
				filter:
				<select name="filter" id="filter">
					<optgroup label="status">
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </optgroup>
					<optgroup label="user">
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </optgroup>
				</select>
			</label>
		</div>
  );
}

export default TodoCardListControls