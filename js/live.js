var ws = "ws://event.zooniverse.org/classifications";

function init() {
	openEventsSocket();
}

function openEventsSocket() {
	websocket = new WebSocket(ws);
	websocket.onopen = function(evt) { onOpen(evt) };
	websocket.onclose = function(evt) { onClose(evt) };
	websocket.onmessage = function(evt) { onMessage(evt) };
	websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) {
	console.log("Connected to Zooniverse event stream...");
	console.log("Ed Paget rules!");
}

function onClose(evt) {
	console.log("Zooniverse event stream disconnected");
}

function onMessage(evt) {
	console.log(evt.data);
}

function onError(evt) {
	console.log("Error:");
	console.log(evt.data);
}

window.addEventListener("load", init, false);