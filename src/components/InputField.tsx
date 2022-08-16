import React, { useRef, useState } from 'react'
import { Todo } from './Todo';


interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handelSubmit: (e: React.FormEvent) => void;
}


const InputField:React.FC<Props>=(props:Props)=> {
    const background=useRef<HTMLInputElement>(null);

    return (
           <div>
            <form className='input' onSubmit={(e) => {
                props.handelSubmit(e)
                background.current?.blur();
             
            }}>
                <input ref={background} className="input__box" type="text" placeholder='type task' value={props.todo} onChange={(e) => props.setTodo(e.target.value)} />
                <button   className="input_submit" type='submit' >Go</button>
            </form>
        </div>
    );
}

export default InputField;

// rafce