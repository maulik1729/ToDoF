import controller from './controller.js'

var view={

    init:function(){
        this.jtoDo=document.querySelector(".todo");

        this.jinput=this.jtoDo.querySelector(".todo__taketask");
        this.jinput.addEventListener("keydown",this.handleTaskAdd);

        this.jfilter_items=this.jtoDo.querySelectorAll(".filter__item");
        this.jfilter_items.forEach((jfilter_item)=>jfilter_item.addEventListener("click",this.handleActiveTab));

        this.jtasks=this.jtoDo.querySelector(".tasklist");
        this.jtasks.addEventListener("click",this.handleToggle);
        this.jtasks.addEventListener("dblclick",this.enableEditMode);
        this.jtasks.addEventListener("keydown",this.disableEditMode);

        this.jspan=this.jtoDo.querySelector(".clearcompleted");
        this.jspan.addEventListener("click",this.handleClearCompletedButton);

        this.render();
    },

    handleTaskAdd:function(e){
        if(e.key!="Enter")
            return;
        const newTask=this.value;
        if(newTask=="")
            return;
        controller.addTask(newTask);
        this.value="";
        view.render();
    },

    handleActiveTab:function(){
        controller.setCurrentState(this.textContent);
        view.jfilter_items.forEach((jfilter_item)=> jfilter_item.classList.remove("filter__item--dark"));
        this.classList.add("filter__item--dark");
        view.render();
    },

    handleToggle:function(e)
    {
        if (e.target.matches(".tasklist--done")) {
           view.markTaskComplete(e);
        }
        else if (e.target.matches(".tasklist--remove")) {
            view.removeTask(e);
        }
    },

    markTaskComplete:function(e){
        const index = parseInt(e.target.dataset.index);
        controller.markTaskComplete(index);
        view.render();
    },

    removeTask:function(e){
        const index = parseInt(e.target.dataset.index);
        controller.removeTask(index);
        view.render();
    },

    render:function() {
        const currentState = controller.getCurrentState();
        const todoMarkup = controller.getAllTasks().filter(task => !(currentState == "Active" && task.done)&&!(currentState == "Completed" && !task.done))
            .map((task, i) => {
                const linepresent=(task.done && currentState == 'All')?"tasklist__text tasklist__text--checked":"tasklist__text";
                return`
                    <li class="tasklist__task">
                        <span class="tasklist__item tasklist--done" data-index="${i}">&#10004</span>
                        <span class="${linepresent}" for="${i}"  data-index="${i}">${task.task}</span>  
                        <span class="tasklist__item tasklist--remove" data-index="${i}">X</span>
                    </li>`;
        }).join('');
        this.jtasks.innerHTML = todoMarkup;
        this.renderClearCompletesButton();
    },

    renderClearCompletesButton:function(){
        const isAnyCompleted=controller.getAllTasks().some(task=>task.done);
        if(isAnyCompleted)
            this.jspan.classList.remove("clearcompleted--hide");
        else
            this.jspan.classList.add("clearcompleted--hide");
    },

    handleClearCompletedButton:function(){
        controller.removeCompletedTask();
        view.render();
    },

    enableEditMode:function(e) {
        if(!e.target.matches("span"))
            return;
        e.target.classList.add("tasklist__text--dark");
        e.target.contentEditable=true;
    },

    disableEditMode:function(e){
        if(!e.target.matches("span")||e.key!="Enter")
            return;
        e.target.contentEditable=false;
        const index = parseInt(e.target.dataset.index);
        const task=e.target.textContent;
        controller.changeTask(index,task);
        view.render();
    }


}

export default view;