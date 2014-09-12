var ws = "ws://event.zooniverse.org/classifications";

function addCircle(project) {
    
    var pulse = $('<div class="pulse"></div>');
    pulse.animate({
        'width': '140%',
        'height': '140%',
        'margin-top': '-70%',
        'margin-left': '-70%',
        'opacity': '0.05'
    }, 1000);
    
    $('#'+project).append(pulse);

    setTimeout(function __remove() {
        $('#'+project).effect( "shake", { times:2, distance:2 }, 300 );
    }, 500);

    setTimeout(function __remove() {
        pulse.remove();
    }, 1000);
}

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
	proj = JSON.parse(evt.data).project;
	onClassification(proj);
}

function onError(evt) {
	console.log("Error:");
	console.log(evt.data);
}

function onClassification(project) {
	// animate project accordingly
	n = parseInt($("#"+project+"-counter").text().replace(/,/g, ''));
	n_new = addCommas(n+1);
	$("#"+project+"-counter").text(n_new);
	console.log("Updating "+project+" to "+n_new);
	addCircle(project);
}

window.addEventListener("load", init, false);