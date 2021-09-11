import axios from 'axios';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Tasks from './Tasks';
import { Spin } from 'antd';


function Column({column , tasks, id,}) {
    const [task, settask] = useState('')
    const [loading, setloading] = useState(false)
    const [header, setHeader] = useState(column.title)


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

   const handleTitleChange = (event) => {

      if (event.key === 'Enter') {
        axios.post(`http://localhost:5000/column/setTitle`, 
        {
          title:header,
          id:id
        }
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
          setHeader(res.data)
        })
      }
    }
    return (
        <div className="flex flex-col h-full">
          <input type="text" name="" id="" className='ml-2 outline-none p-2' value={header}  onChange={(e)=>setHeader(e.target.value)} 
          onKeyDown={(event)=>handleTitleChange(event)} />
            
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
