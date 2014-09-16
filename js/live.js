var ws = "ws://event.zooniverse.org/classifications";

function init() {
	if ("WebSocket" in window)  {
	  openEventsSocket();
 	} else {
 		console.log("Browser does not support web sockets");
 	}
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
//	console.log("Ed Paget rules!");
}

function onClose(evt) {
	console.log("Zooniverse event stream disconnected");
}

function onMessage(evt) {
	try {
    proj = JSON.parse(evt.data).project;
		onClassification(proj);
  } catch(e) {
		console.log("Invalid JSON message from the event stream.");
  }
}

function onError(evt) {
	console.log("Error:");
	console.log(evt.data);
}

function onClassification(project) {
	// animate project accordingly
	n_old = removeCommas($("#"+project+"-counter").text());
	n_new = addCommas(n_old+1);
	$("#"+project+"-counter").text(n_new);
	addCircle(project);
}

window.addEventListener("load", init, false);
