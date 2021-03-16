//Establish the WebSocket connection and set up event handlers

var hostname = "0.0.0.0"
var port = "4567"

var webSocket = new WebSocket("ws://" + hostname + ":" + port + "/chat");
webSocket.onmessage = function (msg) { updateChat(msg); };
webSocket.onclose = function () { alert("WebSocket connection closed") };

//group id
var groupId = "";

id("join").addEventListener("click", function () {
    joinGroup(id("group").value);
})

//Send message if "Send" is clicked
id("send").addEventListener("click", function () {
    sendMessage(id("message").value);
});

//Send message if enter is pressed in the input field
id("message").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) { sendMessage(e.target.value); }
});

//Send a message if it's not empty, then clear the input field
function sendMessage(message) {
    if (message !== "" && groupId !== "") {
        webSocket.send("2-"+groupId+"-"+message);
        id("message").value = "";
    }
}

function joinGroup(group) {
    if (group !== "") {
        groupId = group;
        webSocket.send("1-"+group);
    }
    id("group").disable = true;
    id("join").disable = true;
}

//Update the chat-panel, and the list of connected users
function updateChat(msg) {
    var data = msg.data;
    insert("chat", data);
    id("userlist").innerHTML = "";
    data.userlist.forEach(function (user) {
        insert("userlist", "<li>" + user + "</li>");
    });
}

//Helper function for inserting HTML as the first child of an element
function insert(targetId, message) {
    id(targetId).insertAdjacentHTML("afterbegin", "<h2>"+message+"</h2>");
}

//Helper function for selecting element by id
function id(id) {
    return document.getElementById(id);
}