const data = {
  tasks: [
     { id: 'task-1', content: 'Take out the garbage' },
     { id: 'task-2', content: 'Watch my favorite show' },
     { id: 'task-3', content: 'Charge my phone' },
     { id: 'task-4', content: 'Cook dinner' },
     { id: 'task-5', content: 'Take out the garbage' },
     { id: 'task-6', content: 'Watch my favorite show' },
     { id: 'task-7', content: 'Charge my phone' },
     { id: 'task-8', content: 'Cook dinner' },
     { id: 'task-9', content: 'Watch my favorite show' },
     { id: 'task-10', content: 'Charge my phone' },
     { id: 'task-11', content: 'Cook dinner' },
  ],
  columns: [
     {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4','task-5', 'task-6', 'task-7', 'task-8','task-9', 'task-10', 'task-11'],
    },
     {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    {
      id: 'column-3',
      title: 'Doing',
      taskIds: [],
    },
    {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
    },
    
  ],
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default data;
