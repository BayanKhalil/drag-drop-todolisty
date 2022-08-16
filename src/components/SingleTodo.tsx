import React, { useEffect, useRef, useState  } from 'react'
import { Todo } from './Todo';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import{ MdFileDownloadDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';






type Props = {
  index: number;
    todo: Todo;
  todos: Todo[];
  droppableId: string;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


     

const SingleTodo: React.FC<Props> = (props: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(props.todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  
  
    
  const baseUrl: string = 'http://localhost:4000';
 
     
    
    
  const handleDone = (id: number) => { 
    setIsDone(!isDone)
    const isDoneUpdate: Pick<Todo,"isDone"> = {
      isDone:!isDone
      
    }
    if (props.droppableId === "TodoList") {

      axios.put(`${baseUrl}/edit-todo/${props.todo._id}`, isDoneUpdate).catch(err => { console.log(err) });
    } else {
      
      axios.put(`${baseUrl}/edit-completedtodo/${props.todo._id}`, isDoneUpdate).catch(err => { console.log(err) });
    }


    }


  
  const handleDelete = (id: number) => {
    axios.delete(`${baseUrl}/delete-todo/${id}`)
    axios.delete(`${baseUrl}/delete-completedtodo/${id}`)

        props.setTodos(props.todos.filter((todo)=>todo._id!==id))
  } 


  
  const handleEdit = (e: React.FormEvent, id: number) => { 
    e.preventDefault();
    const todoUpdate: Todo = {
      _id:id,
      todo:editTodo,
      isDone: false,
    }
    console.log(id)
    if (props.droppableId === "TodoList") {
      axios.put(`${baseUrl}/edit-todo/${props.todo._id}`, todoUpdate).catch(err => { console.log(err) });
    } else {
      axios.put(`${baseUrl}/edit-completedtodo/${props.todo._id}`, todoUpdate).catch(err => { console.log(err) });
    }

   
    
    props.setTodos(    props.todos.map((todo) =>
    todo._id === id ? todoUpdate : todo))
    
    setIsEdit(false);
    console.log(props.todos);
  }

    useEffect(() => { 
        inputRef.current?.focus();
    }, [isEdit]);

  return (
      <Draggable draggableId={props.todo._id.toString()} index={props.index}>
        {(provided) => (
    <div className='container'>
          <form className='todos__single' onSubmit={(e) => {
              e.preventDefault();
              handleEdit(e,props.todo._id)
          }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
       ref={provided.innerRef}
      >
              {isEdit ? (
                  <input ref={inputRef} className="todos__single--text" value={editTodo} onChange={(e)=>setEditTodo(e.target.value) } />
                   ):
                
                
                  props.todo.isDone? (
                    <s className="todos__single--text">{props.todo.todo}</s>
                  ): (
                      <span className="todos__single--text">{props.todo.todo}</span>
                    )}
            
               <div>
                  <span className="icon" onClick={() => {
                      if (!isEdit && !props.todo.isDone) {
                      setIsEdit(!isEdit)
              }}}><AiFillEdit /></span>
              <span className="icon" onClick={() => { handleDelete(props.todo._id)}}><AiFillDelete/></span>
              <span className="icon" onClick={()=>handleDone(props.todo._id)}><MdFileDownloadDone/></span>

              </div>
          </form>
         
    </div>
          )}
           </Draggable>
  )
}

export default SingleTodo