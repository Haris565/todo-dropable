import { Draggable } from 'react-beautiful-dnd';
function Tasks({tasks, index}) {
    return (
        <Draggable draggableId={tasks._id} index={index} >
            {(provided, snapshot) => (
                <div className=' p-2 m-2 bg-white rounded-sm'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    
                >
                    {tasks.content}
                </div>
            )}

        </Draggable>
    )
}

export default Tasks