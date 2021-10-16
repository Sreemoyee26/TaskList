const taskContainer= document.querySelector(".task_container");

let globalStorage=[];
let gs=[];

const generateNewCard = (taskData) => ` 
        <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
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

const pad = num => ("0" + num).slice(-2);

const getTimeFromDate = (timestamp) => {
    const DATE = new Date(timestamp * 1000);
    let date = DATE.getDay(),
      month = DATE.getMonth(),
      year = DATE.getYear();
    return pad(month) + ":" + pad(date) + ":" + pad(year)
}

const aa = (event) => {
    const targetID = event.target.id;
    gs = globalStorage.filter((cardObject) => cardObject.id == targetID);
    time = getTimeFromDate(`${gs[0]["id"]}`)
    document.querySelector(".img").src = `${gs[0]["imageUrl"]}`;
    document.querySelector("#date").innerHTML = "Created on " + time;
    document.querySelector("#topic").innerHTML = `${gs[0]["taskTitle"]}`;
    document.querySelector("#type").innerHTML = `${gs[0]["taskType"]}`;
}

const saveEdits = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("editImg").value,
        taskTitle: document.getElementById("editTitle").value,
        taskType: document.getElementById("editType").value,
        taskDescription: document.getElementById("editDescription").value
    };

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    globalStorage.push(taskData);
    localStorage.setItem("taskY",JSON.stringify({cards:globalStorage}));
};

const editCard = (event) => {
    const targetID = event.target.id;
    gs = globalStorage.filter((cardObject) => cardObject.id == targetID);
    document.querySelector("#editImg").value = `${gs[0]["imageUrl"]}`;
    document.querySelector("#editTitle").value = `${gs[0]["taskTitle"]}`;
    document.querySelector("#editType").value = `${gs[0]["taskType"]}`;
    document.querySelector("#editDescription").value = `${gs[0]["taskDescription"]}`;
}