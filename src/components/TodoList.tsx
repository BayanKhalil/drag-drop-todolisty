import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./Todo";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   completedTodo: Todo[];
   setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = (props: Props) => {
  return (
     <div className="container">
       
        <Droppable droppableId="TodoList">
        {
           (provided,snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver?"dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active Tasks</span>
            {props.todos?.map((todo,index) => (
              <SingleTodo
              droppableId="TodoList"
                index={index}
                key={todo._id}
                todo={todo}
                todos={props.todos}
                setTodos={props.setTodos}
              />
            ))}
               {provided.placeholder}
               </div>
           )
        }
    
           </Droppable>
        <Droppable droppableId="TodosRemove"> 
           {
              (provided,snapshot) => (
               <div className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}` }ref={provided.innerRef} {...provided.droppableProps}>
               <span className="todos__heading">Completed Tasks</span>
               {props.completedTodo?.map((todo,index) => (
                 <SingleTodo
                 droppableId="TodosRemove"
                   index={index}
                   key={todo._id}
                   todo={todo}
                   todos={props.completedTodo}
                   setTodos={props.setCompletedTodo}
                 />
               ))}
                  {provided.placeholder}
                  </div>
              )
           }
       
           </Droppable>
    </div>
  );
};

export default TodoList;
