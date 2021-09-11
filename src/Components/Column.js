import axios from 'axios';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tasks from './Tasks';
import { Spin } from 'antd';


function Column({column , tasks, id,}) {
    const [task, settask] = useState('')
    const [loading, setloading] = useState(false)


    const handleKeyDown = (event) => {
      
      if (event.key === 'Enter') {
        setloading(true)
        axios.post(`http://localhost:5000/task/createTask`, 
        {
          content:task,
          columnId:id
        }
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
          settask('')
          setloading(false)
        })
      }
    }
    return (
        <div className="flex flex-col h-full">
            <h2 className='ml-2'>{column.title}</h2>
            <Droppable droppableId={column._id}>
            {(provided, snapshot) => (
            <div
              className='bg-gray-200 h-full overflow-y-scroll scrollbar-hide '
              ref={provided.innerRef}
              {...provided.droppableProps}
              
            >
                {tasks.map((item, index)=>(
                    <Tasks key={item._id} tasks={item} index={index}></Tasks>
                ))}
              {provided.placeholder}
            </div>
          )}
      
            </Droppable>
            {loading? <Spin />:   <input  type="text" name="" id="" placeholder='Add a card...' 
                    className='w-full py-2 bg-gray-100 p-2 mt-auto outline-none'
                    value={task}
                    onChange={(e)=>settask(e.target.value)}
                    onKeyDown={handleKeyDown}
            />}
            
         
          
        </div>
    )
}

export default Column
