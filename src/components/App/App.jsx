import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css';

function App () {
  
  
const fetchTasks = () => {
  axios({
    method: 'GET',
    url: '/api/todo'
  }).then((response) => {
    console.log(response);
    console.log(response.data);
    setTaskList(response.data);
  }).catch((error) => {
    console.log(error);
  });
}

const [taskList, setTaskList] = useState([]);


useEffect(fetchTasks, []);

// Will use later
const [newTaskName, setNewTaskName] = useState('');
const [newTaskLocation, setNewTaskLocation] = useState('');

const addTask = (event) => {
  event.preventDefault();

  axios({
    method: 'POST',
    url: '/api/todo',
    data:{
      name: newTaskName,
      location: newTaskLocation
    }
  })
  .then ((response) => {
    console.log('successful post:', response);
    fetchTasks();
    setNewTaskName('');
    setNewTaskLocation('');
  })
  .catch((error) => {
    console.log('post failed', error);
  })
}

const deleteTask = (id) => {
  axios.delete(`/api/todo/${id}`)
  .then((response) => {
    console.log('deleting task worked:', response);
    fetchTasks();
  })
  .catch(function(error) {
    console.log(error)
  })
}

const toggleTask = (id) => {
  console.log('toggling', id);

  axios.put(`/api/todo/toggle/${id}`)
  .then((response) => {
    console.log('toggling creature worked:', response);
    fetchTasks();
  })
  .catch(function(error) {
    console.log(error);
  })
};



  return (
    <div>
      <h1>TO DO Checklist</h1>

      <h2>Add a task</h2>
      <form onSubmit={addTask}>

        <label htmlFor="name">Name:</label>
        <input id="name" onChange={(event) => setNewTaskName(event.target.value)} 
        value={newTaskName} />
        <br/>
        <br/>
        <label htmlFor='location'>Location:</label>
        <input id="location" onChange={(event) => setNewTaskLocation(event.target.value)} 
        value={newTaskLocation}/>
        
        <br/>
        <button type='submit'>Add new task</button>
      </form>

      <h2>Tasks</h2>
      <ul>
                {taskList.map((task) => (
                    <li key={task.id} className={task.completed ? 'completed' : 'standard'}>
                        {task.name} in {task.location}
                        <div>
                            <button className="complete" onClick={() => toggleTask(task.id)}>
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button className="delete" onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
    </div>
  );

}

export default App
