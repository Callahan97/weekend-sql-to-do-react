import {useEffect, useState} from 'react';
import axios from 'axios';
function App () {
  
const fetchTasks = () => {
  axios({
    method: 'GET',
    url: '/api/tasks'
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
    url: '/api/task',
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
















  return (
    <div>
      <h1>TO DO Checklist</h1>
    </div>
  );

}

export default App
