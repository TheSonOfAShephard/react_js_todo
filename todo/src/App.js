import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { uuid } from 'uuidv4';

const LOCAL_STORAGE_KEY = 'todoListApp.todoList'

function App() {
  const [todoList, setTodoList] = useState([])

  const contentRef = useRef();

  useEffect(() => {
    const storedTodoList = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodoList)
      setTodoList(JSON.parse(storedTodoList));
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList])

  function handleAddTodo() {
    const content = contentRef.current.value;
    if (content === '') return
    setTodoList(prevTodoList => {
      return [...prevTodoList, 
        {
          id: uuid(),
          content: content,
          isDone: false
        }]
    })
    contentRef.current.value = null;
  }

  function handleDeleteTodo(id) {
    setTodoList(todoList.filter(item => item.id !== id));
  }

  function toggleTodo(i) {
    const newTodoList = [...todoList];
    newTodoList[i].isDone = !newTodoList[i].isDone;
    setTodoList(newTodoList);
  }

  function handleEnterKey(event) {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form className="todo_list">
          <ul>
            {todoList.map((todoItem, i) => (
              <div key={todoItem.id} className={todoItem.isDone ? "is_done" : "todo_item"}>
                <div className="checkbox" onClick={() => toggleTodo(i)}>
                  {todoItem.isDone && (
                    <span>&#x2714;</span>
                  )}
                </div>
                <p id="todo_name">
                  {todoItem.content}
                </p>
                <button onClick={() => handleDeleteTodo(todoItem.id)} id="trash">
                  <img
                      className="trash_icon"
                      src={process.env.PUBLIC_URL + '/trash.png'}/> 
                  </button>
              </div>
            ))}
          </ul>
        </form>
        <div className="add_todo">
          <input id="text_field" 
            ref={contentRef} 
            onKeyDown={event => handleEnterKey(event)}
            type="text" 
            placeholder="Add Todo"/>
          <button onClick={handleAddTodo} id="submit_button">
              Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
