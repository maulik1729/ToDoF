import '../styles/style.css';
const toDo=document.querySelector(".To-Do");
const tasks=toDo.querySelector(".Task");
const form=toDo.querySelector(".Form");

var workToDo=[];
function Task(work,done)
{
    this.work=work;
    this.done=done;
}

function  showTask()
{
    tasks.innerHTML=workToDo.map((work,i) =>{
        return `
            <li>
                <input type="checkbox" id="${i}" ${work.done?'checked':''}>
                <label for="${i}" data-index="${i}">${work.work}</label>  
                <span data-i="${i}">X</span>
            </li>  
        `;
    }).join('');
}

function addTask(e)
{
    e.preventDefault();
    const val=this.querySelector('input[type="text"]').value;
    const task=new Task(val,false);
    workToDo.push(task);
    showTask();
}

function toggle(e)
{

    if(e.target.matches("input"))
    {
        const index=parseInt(e.target.id);
        workToDo[index].done=!workToDo[index].done;
        showTask();
    }
    else if(e.target.matches("span"))
    {
        const index=parseInt(e.target.dataset.index);
        workToDo.splice(index,1);
        showTask();
    }
}

form.addEventListener("submit",addTask);
tasks.addEventListener("click",toggle);
