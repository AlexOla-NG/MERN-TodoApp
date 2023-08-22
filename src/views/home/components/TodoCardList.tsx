import React from 'react'
import TodoCard from './TodoCard'

const TodoCardList = () => {
  return (
    <section className='todo-card-list'>
      <ul>
        <TodoCard />
      </ul>
    </section>
  )
}

export default TodoCardList