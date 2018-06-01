!function(t){var e={};function a(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);var s={currentState:"All",init:function(){localStorage.taskToDo||(localStorage.taskToDo=JSON.stringify([]))},addToLocalStorage:function(t){localStorage.taskToDo=JSON.stringify(t)},getAllTasks:function(){try{return JSON.parse(localStorage.taskToDo)}catch(t){return new Error("localStorage Issue")}}},n={getAllTasks:()=>s.getAllTasks(),addTask:t=>{var e=s.getAllTasks(localStorage.taskToDo);e.push({task:t,done:!1}),s.addToLocalStorage(e)},changeTask:(t,e)=>{var a=s.getAllTasks();a[t].task=e,s.addToLocalStorage(a)},removeTask:t=>{var e=s.getAllTasks();e.splice(t,1),s.addToLocalStorage(e)},markTaskComplete:t=>{var e=s.getAllTasks();e[t].done=!e[t].done,s.addToLocalStorage(e)},removeCompletedTask:()=>{var t=s.getAllTasks();t=t.filter(t=>!t.done),s.addToLocalStorage(t)},getCurrentState:t=>s.currentState,setCurrentState:t=>{s.currentState=t}},r={init:function(){this.jtoDo=document.querySelector(".todo"),this.jinput=this.jtoDo.querySelector(".todo__taketask"),this.jinput.addEventListener("keydown",this.handleTaskAdd),this.jfilter_items=this.jtoDo.querySelectorAll(".filter__item"),this.jfilter_items.forEach(t=>t.addEventListener("click",this.handleActiveTab)),this.jtasks=this.jtoDo.querySelector(".tasklist"),this.jtasks.addEventListener("click",this.handleToggle),this.jtasks.addEventListener("dblclick",this.enableEditMode),this.jtasks.addEventListener("keydown",this.disableEditMode),this.jspan=this.jtoDo.querySelector(".clearcompleted"),this.jspan.addEventListener("click",this.handleClearCompletedButton),this.render()},handleTaskAdd:function(t){if("Enter"!=t.key)return;const e=this.value;""!=e&&(n.addTask(e),this.value="",r.render())},handleActiveTab:function(){n.setCurrentState(this.textContent),r.jfilter_items.forEach(t=>t.classList.remove("filter__item--dark")),this.classList.add("filter__item--dark"),r.render()},handleToggle:function(t){t.target.matches(".tasklist--done")?r.markTaskComplete(t):t.target.matches(".tasklist--remove")&&r.removeTask(t)},markTaskComplete:function(t){const e=parseInt(t.target.dataset.index);n.markTaskComplete(e),r.render()},removeTask:function(t){const e=parseInt(t.target.dataset.index);n.removeTask(e),r.render()},render:function(){const t=n.getCurrentState(),e=n.getAllTasks().filter(e=>!("Active"==t&&e.done||"Completed"==t&&!e.done)).map((e,a)=>{return`\n                    <li class="tasklist__task">\n                        <span class="tasklist__item tasklist--done" data-index="${a}">&#10004</span>\n                        <span class="${e.done&&"All"==t?"tasklist__text tasklist__text--checked":"tasklist__text"}" for="${a}"  data-index="${a}">${e.task}</span>  \n                        <span class="tasklist__item tasklist--remove" data-index="${a}">X</span>\n                    </li>`}).join("");this.jtasks.innerHTML=e,this.renderClearCompletesButton()},renderClearCompletesButton:function(){n.getAllTasks().some(t=>t.done)?this.jspan.classList.remove("clearcompleted--hide"):this.jspan.classList.add("clearcompleted--hide")},handleClearCompletedButton:function(){n.removeCompletedTask(),r.render()},enableEditMode:function(t){t.target.matches("span")&&(t.target.classList.add("tasklist__text--dark"),t.target.contentEditable=!0)},disableEditMode:function(t){if(!t.target.matches("span")||"Enter"!=t.key)return;t.target.contentEditable=!1;const e=parseInt(t.target.dataset.index),a=t.target.textContent;n.changeTask(e,a),r.render()}},o=r;s.init(),o.init()}]);