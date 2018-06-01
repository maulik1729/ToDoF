import model from './model.js';

var controller = {

    getAllTasks:()=>{
        return model.getAllTasks();
    },

    addTask:(newTask)=>{
        var taskToDo = model.getAllTasks(localStorage.taskToDo);
        taskToDo.push({task:newTask,done:false});
        model.addToLocalStorage(taskToDo);
    },

    changeTask:(index,newTask)=>{
        var taskToDo = model.getAllTasks();
        taskToDo[index].task=newTask;
        model.addToLocalStorage(taskToDo);
    },

    removeTask:(index)=>{
        var taskToDo = model.getAllTasks();
        taskToDo.splice(index, 1);
        model.addToLocalStorage(taskToDo);
    },


    markTaskComplete:(index)=>{
        var taskToDo = model.getAllTasks();
        taskToDo[index].done=!taskToDo[index].done;
        model.addToLocalStorage(taskToDo);
    },

    removeCompletedTask:()=>{
        var taskToDo=model.getAllTasks();
        taskToDo=taskToDo.filter(task=>!task.done);
        model.addToLocalStorage(taskToDo);
    },

    getCurrentState:(index)=>{
        return model.currentState;
    },

    setCurrentState:(newState)=>{
        model.currentState=newState;
    }

}
export default controller;


