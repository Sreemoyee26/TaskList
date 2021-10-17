const taskContainer= document.querySelector(".task_container");

let globalStorage=[];
let gs=[];
let fs=[];

const generateNewCard = (taskData) => ` 
        <div class="col-lg-4 col-md-6 col-sm-12 mt-4" id="content">
            <div class="card">
                <div class="card-header d-flex justify-content-end gap-1">
                    <button type="button" class="btn btn-outline-success" id= ${taskData.id} data-bs-toggle="modal" data-bs-target="#editModal" 
                    onclick="editCard.apply(this,arguments)">
                        <i class="fas fa-pencil-alt" id= ${taskData.id} onclick="editCard.apply(this,arguments)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" id= ${taskData.id} onclick="deleteCard.apply(this,arguments)"> 
                        <i class="fas fa-trash" id= ${taskData.id} onclick="deleteCard.apply(this,arguments)"></i> 
                    </button>
                </div>
                <div class="card-body">
                    <img src="${taskData.imageUrl}" class="card-img-top mb-3" alt="task picture" style="height:230px;">
                    <h5 class="card-title fw-bold">${taskData.taskTitle}</h5>
                    <p class="card-text overflow-auto" style="height:100px;">${taskData.taskDescription}</p>
                    <button class="btn btn-primary p-0 fw-bold" style="max-width:100%;max-height:1.5em;">${taskData.taskType}</button>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-outline-primary open" data-bs-toggle="modal" data-bs-target="#ModalView" 
                    onclick="aa.apply(this,arguments)" id= ${taskData.id}>Open Task</a>
                </div>
            </div>    
        </div>
    `

const loadInitialCardData = () =>{
    const getCardData = localStorage.getItem("taskY");
    const {cards} = JSON.parse(getCardData);
    cards.map((cardObject)=>{
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        globalStorage.push(cardObject);
    })
};

const deleteCard = (event) =>{
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStorage = globalStorage.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("taskY",JSON.stringify({cards:globalStorage}));

    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    globalStorage.push(taskData);
    localStorage.setItem("taskY",JSON.stringify({cards:globalStorage}));
};

const getTimeFromDate = (timestamp) => {
    console.log(timestamp);
    var DATE = new Date(timestamp*1);
    return DATE.toDateString();
    //return DATE.toUTCString();  for time alongwith date
}

const aa = (event) => {
    const targetID = event.target.id;
    gs = globalStorage.filter((cardObject) => cardObject.id == targetID);
    time = getTimeFromDate(`${gs[0]["id"]}`)
    document.querySelector(".img").src = `${gs[0]["imageUrl"]}`;
    document.querySelector("#date").innerHTML = "Created on " + time;
    document.querySelector("#topic").innerHTML = `${gs[0]["taskTitle"]}`;
    document.querySelector("#desc").innerHTML = `${gs[0]["taskDescription"]}`;
}

const saveEdits = () => {
    const editData = {
        id: document.getElementById("editId").value,
        imageUrl: document.getElementById("editImg").value,
        taskTitle: document.getElementById("editTitle").value,
        taskType: document.getElementById("editType").value,
        taskDescription: document.getElementById("editDescription").value
    };
    globalStorage = globalStorage.map((object) =>{
        if(object.id === editData.id){
            object.imageUrl = editData.imageUrl;
            object.taskTitle = editData.taskTitle;
            object.taskType = editData.taskType;
            object.taskDescription = editData.taskDescription;
            return object;
        }
        else{
            return object;
        }
    });
    localStorage.setItem("taskY",JSON.stringify({cards:globalStorage}));
    window.location.reload(1);
};

const editCard = (event) => {
    const targetID = event.target.id;
    gs = globalStorage.filter((cardObject) => cardObject.id == targetID);
    document.querySelector("#editId").value = targetID;
    document.querySelector("#editImg").value = `${gs[0]["imageUrl"]}`;
    document.querySelector("#editTitle").value = `${gs[0]["taskTitle"]}`;
    document.querySelector("#editType").value = `${gs[0]["taskType"]}`;
    document.querySelector("#editDescription").value = `${gs[0]["taskDescription"]}`;
}

const search = () =>{
    var searchItem = document.querySelector(".search").value;
    if(searchItem===""){
        window.location.reload(1);
    }
    else{
        globalStorage = globalStorage.filter((cardObject) => cardObject.taskTitle === searchItem);
        console.log(globalStorage);
        taskContainer.innerHTML="";
        globalStorage.map((cardObject)=>{
            taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        });
    }
}