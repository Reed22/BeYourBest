function newMember() {
    if(document.getElementById("member-form").style.visibility === "hidden") {
        document.getElementById("member-form").style.visibility = "visible";
        document.getElementById("member-btn").textContent = "Hide";
    }
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
    else {
        document.getElementById("class-form").style.visibility = "hidden";
        document.getElementById("class-btn").textContent = "Add New Class";
    }
}

//Deleting Members - Client Side
//Sends GET request to '/deleteMember'
var delete_buttons = document.getElementsByClassName('member-delete')
for(let i = 0; i < delete_buttons.length; i++) {
    let index = i + 1;
    delete_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('members-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        row.remove();

        var req = new XMLHttpRequest();
        var url = "http://localhost:3000/deleteMember?id=" + rows_id;
        req.open('GET', url, true);
        req.send();
        event.preventDefault();
    });
}

//Update Members - Client Side
//Sends a GET requesy to '/updateMember'
var update_buttons = document.getElementsByClassName('member-update')
for(let i = 0; i < update_buttons.length; i++) {
    let index = i + 1;
    update_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('members-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        var baseUrl = window.location.origin;
        var newUrl = baseUrl + '/updateMember?id=' + rows_id
        window.location.replace(newUrl)
    });
}

//Deleting Trainers - Client Side
//Sends GET request to '/trainers'
var delete_buttons = document.getElementsByClassName('trainer-delete')
for(let i = 0; i < delete_buttons.length; i++) {
    let index = i + 1;
    delete_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('trainer-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        row.remove();

        var req = new XMLHttpRequest();
        var url = "http://localhost:3000/deleteTrainer?id=" + rows_id;
        req.open('GET', url, true);
        req.send();
        event.preventDefault();
    });
}

//Deleting Equipment - Client Side
//Sends GET request to '/deleteEquipment'
var delete_buttons = document.getElementsByClassName('equipment-delete')
for(let i = 0; i < delete_buttons.length; i++) {
    let index = i + 1;
    delete_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('equipment-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        row.remove();

        var req = new XMLHttpRequest();
        var url = "http://localhost:3000/deleteEquipment?id=" + rows_id;
        req.open('GET', url, true);
        req.send();
        event.preventDefault();
    });
}

//Update Equipment - Client Side
//Sends a GET requesy to '/update-inspection'
var update_buttons = document.getElementsByClassName('equipment-update')
for(let i = 0; i < update_buttons.length; i++) {
    let index = i + 1;
    update_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('equipment-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        var baseUrl = window.location.origin;
        var newUrl = baseUrl + '/update-inspection?id=' + rows_id
        window.location.replace(newUrl)
    });
}

//Deleting Class - Client Side
//Sends GET request to '/delete-class'
var delete_buttons = document.getElementsByClassName('class-delete')
for(let i = 0; i < delete_buttons.length; i++) {
    let index = i + 1;
    delete_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('class-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        row.remove();

        var req = new XMLHttpRequest();
        var url = "http://localhost:3000/delete-class?id=" + rows_id;
        req.open('GET', url, true);
        req.send();
        event.preventDefault();
    });
}

//Update Class - Client Side
//Sends a GET requesy to '/update-inspection'
var update_buttons = document.getElementsByClassName('class-update')
for(let i = 0; i < update_buttons.length; i++) {
    let index = i + 1;
    update_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('class-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        var baseUrl = window.location.origin;
        var newUrl = baseUrl + '/update-class?id=' + rows_id
        window.location.replace(newUrl)
    });
}

//See Enrolled Members of Class - Client Side
//Sends a GET requesy to '/update-inspection'
var update_buttons = document.getElementsByClassName('class-enrolled')
for(let i = 0; i < update_buttons.length; i++) {
    let index = i + 1;
    update_buttons[i].addEventListener('click', function(event) {
        var table = document.getElementById('class-table');
        var row = table.rows[index];
        var rows_id = row.children[0].innerHTML;
        var baseUrl = window.location.origin;
        var newUrl = baseUrl + '/enrolled?id=' + rows_id
        window.location.replace(newUrl)
    });
}