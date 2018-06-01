var model= {
    currentState:"All",

    init:function() {
        if(!localStorage.taskToDo)
        {
            localStorage.taskToDo=JSON.stringify([]);
        }
    },
    addToLocalStorage:function(taskToDo){
        localStorage.taskToDo = JSON.stringify(taskToDo);
    },

    getAllTasks:function(){
        try {
            return JSON.parse(localStorage.taskToDo);
        }catch (e) {
            return new Error("localStorage Issue");
        }
    },

}

export default model;