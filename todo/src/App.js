import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    {
      content:'Do Laundry',
      isDone: true,
    }
  ])

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form className="todo_list">
          <ul>
            {todoList.map((todoItem,i) => (
              <div className="todo_item">
                <div className="checkbox" />
                <input type="text" value={todoItem.content}/>
                <div className="trash">
                  <img
                    className="trash_icon" 
                    src={process.env.PUBLIC_URL + '/trash.png'}/> 
                </div>
              </div>
            ))}
          </ul>
        </form>
        <form className="add_todo">
          <input type="text" id="text_field" placeholder="Add Todo"/>
          <input type="button" 
            onClick={() => {
              const newTodoList = [...todoList];
              newTodoList.push(
                {
                  content:'something else',
                  isDone: true,
                }
              )
              setTodoList(newTodoList)
            }}
            value="Add"
            id="submit_button"/>
        </form>
      </div>
    </div>
  );
}

export default App;
