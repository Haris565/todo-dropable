import Header from './Components/Header';
import { Layout } from 'antd';
import Main from './Main';
import { PlusOutlined, SlackOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'
import initialData from "./data"

import Column from './Components/Column';
import { DragDropContext } from 'react-beautiful-dnd';

import { Row, Col } from 'antd';
import { Spin } from 'antd';




const { Content } = Layout;

function App() {

  const [column, setcolumn] = useState('')
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState()
  const [tasks, settasks] = useState()
  const [colLoading, setcolLoading] = useState(false)
  // const [taskLoading, settaskLoading] = useState(false)
  // const [addTask, setaddTask] = useState('')
 
  useEffect(() => {
    setloading(true)
    axios.get("https://todo-taccos.herokuapp.com/column/getColumn").then(
      (res)=>{
        setdata(res.data.columns)
        settasks(res.data.tasks)
        console.log(res.data.columns)
        
      }
      
      
    ) 
    setloading(false) 
  
  }, [column])


  // const handleKeyDown =(event , id)=>{
  //   if (event.key === 'Enter') {
  //     settaskLoading(true)
  //     axios.post(`http://localhost:5000/task/createTask`, 
  //     {
  //       content:addTask,
  //       columnId:id
  //     }
  //     )
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //       setaddTask('')
  //       settaskLoading(false)
  //     })
  //   }
  // }


  // const onChangeValue=(event)=>{
  //   setaddTask(event.target.value)
  // }

  const addColumn = () => {
    setcolLoading(true)
    axios.post(`https://todo-taccos.herokuapp.com/column/createColumn`, 
    {
      title:column
    }
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
      setcolumn('')
      setcolLoading(false)
    })
  }


  
  const onDragEnd = (result) => {
    console.log(result)
    const {destination , source , draggableId} = result
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index ) return;
    const start = data.find((val)=>val._id===source.droppableId)
    const end = data.find((val, index)=>val._id===destination.droppableId)
    console.log(start);
    console.log(end)

    if(start._id===end._id){
      const newArray = Array.from(start.taskIds);
      newArray.splice(source.index, 1)
      newArray.splice(destination.index,0, draggableId)
      console.log('New Array ______________________________________')
      console.log(newArray)
    
   


      let index = data.findIndex((val)=>val._id === source.droppableId)
      console.log(index)
      data[index].taskIds=newArray
      console.log(data)
    

      const newState= [
        ...data,
      ]
      console.log("State")
      console.log(newState)
      setdata(newState)
      return
     }

      const newArray = Array.from(start.taskIds)
      newArray.splice(source.index, 1)
      let index = data.findIndex((val)=>val._id === source.droppableId)
      data[index].taskIds=newArray

      const endArray = Array.from(end.taskIds)
      endArray.splice(destination.index, 0 , draggableId)
      let secondIndex = data.findIndex((val)=>val._id === destination.droppableId)
      data[secondIndex].taskIds=endArray


      const newState= 
        [
            ...data
          
          ]
        

      setdata(newState)

  

  }

  if(loading){
    return   <Spin size="large" />
  }

  return (
 
    <Layout style={{backgroundColor:"#fff"}}>
      <Header />
    <Content className='m-5 bg-gradient-to-b from-blue-400 to-green-400' style={{minHeight:'520px'}} >
        <div className='flex flex-row'>
          <div>
          <h2 className='ml-7 mt-2 text-white '>Tacco's Taccos</h2>
          </div>
          
          <div className='mt-2 border-r border-white px-3 '>
            <StarOutlined style={{color:"#fff"}} />
          </div>

          <div className='mt-2 border-r border-white px-3 flex flex-row'>
            <SlackOutlined style={{color:"#fff"}} className='ml-2 mt-1'/>
            <h2 className= 'text-white ml-2'>Tacco & co</h2>
            <div className='text-white bg-white rounded-lg px-2 bg-opacity-40 ml-2'>
              <h1 className='text-white'>pro</h1>
            </div>
          </div>

          <div className='flex flex-row mt-2 border-r border-white px-3'>
            <TeamOutlined style={{color:"#fff"}} className='ml-2 mt-1' />
            <h2 className='text-white ml-2'>Team visible</h2>
          </div>

          <div className='flex flex-row mt-2 ml-2'>
            <input type="text" placeholder='Add column ... ' 
                   className='outline-none text-xs rounded-sm px-2 py-1'
                   value={column}
                   onChange={(e)=>setcolumn(e.target.value)}
            />
            <div className='bg-green-400 px-2 cursor-pointer rounded-sm transition duration-500 ease-in-out transform'>
              {colLoading ? <Spin style={{justifyContent:"center" }}/> : <PlusOutlined style={{color:"#fff"}} onClick={addColumn} />}
            </div>
            
          </div>
        </div>
        
        <DragDropContext onDragEnd={onDragEnd}> 
      <Row className=' w-full my-4' justify='space-around' >
        {tasks ? data?.map((column,index)=>{
          let col = column
          let task = col.taskIds.map((taskId)=> tasks?.find((val)=>val._id===taskId))
          console.log("----------------------")
          console.log(task)
          return <Col span={5} className='bg-gray-50 mt-2' style={{height:"400px",}}  >
                    <Column column={col} key={col._id} tasks={task} id={col._id}  />
                </Col>
        }):<div className='text-white font-bold text-2xl text-center'>Add columns </div>}
      </Row>
    </DragDropContext>
    </Content>
   
  </Layout>
  )
}

export default App
