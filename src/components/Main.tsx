import React, { useState } from 'react';
import '../App.css';
import InputField from './InputField';
import TodoList from './TodoList';
import { Todo } from './Todo';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';



 const  baseUrl:string='http://localhost:4000'


    


const Main: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);
  
  axios.get(baseUrl + "/todos").then(res => {setTodos(res.data)}).catch(err => {console.log(err)});
  
  axios.get(baseUrl + "/completedtodos").then(res =>{setCompletedTodo(res.data) }).catch(err => {console.log(err)});
 
  
  const handelSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    const itodo: Todo = {
      _id: todos.length + 1,
      todo: todo,
      isDone: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    console.log("one")
    
     axios.post(baseUrl + "/add-todo", itodo)
      console.log(itodo)
    setTodos([ ...todos,itodo]);
      setTodo("")
    console.log(todos)
}

 

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { destination, source } = result;
    

    if (!destination) {
      return ;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add: Todo;
    let active = todos;
    let complete = completedTodo;
   
    

    if (source.droppableId === "TodoList") {
      const completetodo: Todo = {
        _id: complete.length + 1,
        todo: active[source.index].todo,
        isDone: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      axios.post(baseUrl + "/add-completed-todo", completetodo).catch(err => { console.log(err) })
      setCompletedTodo([...complete, completetodo]);
      add = active[source.index];      
      active.splice(source.index, 1);
      axios.delete(`${baseUrl}/delete-todo/${add._id}`)

    } else {
      const itodo: Todo = {
        _id: todos.length + 1,
        todo: complete[source.index].todo,
        isDone: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      axios.post(baseUrl + "/add-todo", itodo).catch(err => { console.log(err) })
      setTodos([...active, itodo]);
      add = complete[source.index];
      complete.splice(source.index, 1);
      axios.delete(`${baseUrl}/delete-completedtodo/${add._id}`)

    }

    // if (destination.droppableId === "TodoList") { 
    //   active.splice(destination.index, 0, add);
    // } else {
    //   complete.splice(destination.index, 0, add);
    // }
    // setTodos(active);
    // setCompletedTodo(complete);
    
      
   
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="App">
      
      <InputField todo={todo} setTodo={setTodo} handelSubmit={handelSubmit} />
      <TodoList todos={todos} setTodos={setTodos} completedTodo={ completedTodo} setCompletedTodo={setCompletedTodo} />
    </div>
    </DragDropContext>
   );

}

export default Main;
