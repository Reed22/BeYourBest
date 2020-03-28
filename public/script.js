function newMember() {
    if(document.getElementById("member-form").style.visibility === "hidden") {
        document.getElementById("member-form").style.visibility = "visible";
        document.getElementById("member-btn").textContent = "Hide";
    }
    //Else part is not working.
    else {
        document.getElementById("member-form").style.visibility = "hidden";
        document.getElementById("member-btn").textContent = "Add New Member";
    }
}

function newTrainer() {
    if(document.getElementById("trainer-form").style.visibility == "hidden") {
        document.getElementById("trainer-form").style.visibility = "visible";
        document.getElementById("trainer-btn").textContent = "Hide";
    }
    //Else part is not working.
    else {
        document.getElementById("trainer-form").style.visibility = "hidden";
        document.getElementById("trainer-btn").textContent = "Add New Trainer";
    }
}

function newEquipment() {
    if(document.getElementById("equipment-form").style.visibility == "hidden") {
        document.getElementById("equipment-form").style.visibility = "visible";
        document.getElementById("equipment-btn").textContent = "Hide";
    }
    //Else part is not working.
    else {
        document.getElementById("equipment-form").style.visibility = "hidden";
        document.getElementById("equipment-btn").textContent = "Add New Equipment";
    }
}

function newClass() {
    if(document.getElementById("class-form").style.visibility == "hidden") {
        document.getElementById("class-form").style.visibility = "visible";
        document.getElementById("class-btn").textContent = "Hide";
    }
    //Else part is not working.
    else {
        document.getElementById("class-form").style.visibility = "hidden";
        document.getElementById("class-btn").textContent = "Add New Class";
    }
}

function deleteMember(id){
  var el = document.getElementById(id);
  el.parentNode.parentNode.remove();
  var req = new XMLHttpRequest();
  var url = "http://localhost:3000/deleteMember?id=" + id;
  req.open('GET', url, true);
  req.send();
  event.preventDefault();
}

function deleteTrainer(id){
  var el = document.getElementById(id);
  el.parentNode.parentNode.remove();
  var req = new XMLHttpRequest();
  var url = "http://localhost:3000/deleteTrainer?id=" + id;
  req.open('GET', url, true);
  req.send();
  event.preventDefault();
}

function deleteEquipment(id){
  var el = document.getElementById(id);
  el.parentNode.parentNode.remove();
  var req = new XMLHttpRequest();
  var url = "http://localhost:3000/deleteEquipment?id=" + id;
  req.open('GET', url, true);
  req.send();
  event.preventDefault();
}

function deleteClass(id){
  var el = document.getElementById(id);
  el.parentNode.parentNode.remove();
  var req = new XMLHttpRequest();
  var url = "http://localhost:3000/deleteClass?id=" + id;
  req.open('GET', url, true);
  req.send();
  event.preventDefault();
}
