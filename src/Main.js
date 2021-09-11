import './index.css'
import initialData from "./data"
import { useEffect, useState } from 'react';
import Column from './Components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './Components/Header';
import { Row, Col } from 'antd';
import axios from 'axios';

function Main({column}) {
    
    const [data, setdata] = useState(column)
  const [loading, setloading] = useState(false)
 



    
  // const onDragEnd = (result) => {
  //   const {destination , source , draggableId} = result
  //   if(!destination) return;
  //   if(destination.droppableId === source.droppableId && destination.index === source.index ) return;
  //   const start = data.columns[source.droppableId]
  //   const end = data.columns[destination.droppableId]

  //   if(start===end){
  //     const newArray = Array.from(start.taskIds);
  //     newArray.splice(source.index, 1)
  //     newArray.splice(destination.index,0, draggableId)
  //     const newColumn ={
  //       ...start,
  //       taskIds:newArray
  //     }

  //     const newState= {
  //       ...data,
  //       columns:{
  //         ...data.columns,
  //         [newColumn.id]:newColumn
  //       }
  //     }
  //     setdata(newState)
  //     return
  //   }

  //   const newArray = Array.from(start.taskIds)
  //   newArray.splice(source.index, 1)
  //   const newCol = {
  //     ...start,
  //     taskIds: newArray
  //   }

  //   const endArray = Array.from(end.taskIds)
  //   endArray.splice(destination.index, 0 , draggableId)
  //   const secondCol = {
  //     ...end,
  //     taskIds: endArray,
  //   }


  //   const newState = {
  //     ...data,
  //     columns:{
  //       ...data.columns,
  //       [newCol.id]:newCol,
  //       [secondCol.id]:secondCol
  //     }
  //   }

  //   setdata(newState)

  

  // }
  // return (
  //   <DragDropContext onDragEnd={onDragEnd}> 
  //     <div className="flex flex-row justify-between">
  //       {data.columnOrder.map((columnId)=>{
  //         let col = data.columns[columnId]
  //         let task = col.taskIds.map((taskId)=> data.tasks[taskId])
  //         return <Column column={col} key={col.id} tasks={task} />
  //       })}
  //     </div>
  //   </DragDropContext>



















  const onDragEnd = (result) => {
    const {destination , source , draggableId} = result
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index ) return;
    const start = data.columns.find((val)=>val.id===source.droppableId)
    const end = data.columns.find((val, index)=>val.id===destination.droppableId)
    console.log(start);
    console.log(end)

    if(start===end){
      const newArray = Array.from(start.taskIds);
      newArray.splice(source.index, 1)
      newArray.splice(destination.index,0, draggableId)
   


      let index = data.columns.findIndex((val)=>val.id === source.droppableId)
      console.log(index)
      data.columns[index].taskIds=newArray
    

      const newState= {
        ...data,
        columns:[
          ...data.columns,
        
        ]
      }
      console.log("State")
      console.log(newState)
      setdata(newState)
      return
    }

    const newArray = Array.from(start.taskIds)
    newArray.splice(source.index, 1)
    let index = data.columns.findIndex((val)=>val.id === source.droppableId)
    data.columns[index].taskIds=newArray

    const endArray = Array.from(end.taskIds)
    endArray.splice(destination.index, 0 , draggableId)
    let secondIndex = data.columns.findIndex((val)=>val.id === destination.droppableId)
    data.columns[secondIndex].taskIds=endArray


    const newState= {
        ...data,
        columns:[
          ...data.columns,
        
        ]
      }

    setdata(newState)

  

  }
  return (
      

    <DragDropContext onDragEnd={onDragEnd}> 
      <Row className=' w-full my-4' justify='space-around' >
        {data?.map((column,index)=>{
          let col = column
        //   let task = col.taskIds.map((taskId)=> data.tasks.find((val)=>val.id===taskId))
        //   console.log(task)
          return <Col span={5} className='bg-gray-50 mt-2' style={{height:"400px",}}>
                    <Column column={col} key={col.id} tasks={[]} id={col.id} />
                </Col>
        })}
      </Row>
    </DragDropContext>











  );
}

export default Main;
