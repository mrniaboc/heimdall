function removeCommas(nStr) {
	nStr += '';
	n = parseInt(nStr.replace(/,/g, ''));
	return n;
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

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

// Function to create each prpoject's HTML
function itemHTML(p) {

	$.getJSON("https://api.zooniverse.org/projects/"+p["name"]+"/", function(data) {

		item = 	"<li>"+
		"<div id=\""+p["name"]+"\" class=\"project-box\" title=\""+p["display_name"]+"\">"+
			"<a href=\"https://api.zooniverse.org/projects/"+p["name"]+"/status\" target=\"_blank\">"+
				"<img src=\"http://static.zooniverse.org/heimdall.zooniverse.org/images/"+p["name"]+".jpg\" alt=\""+p["display_name"]+"\" />"+
			"</a>"+
			"<span class=\"counts\">"+
				"<span title=\"Classifications\" id=\""+p["name"]+"-counter\" class=\"left\">"+addCommas(data["classification_count"])+"</span>"+
				"<span title=\"Registered Users\" class=\"right\">"+addCommas(data["user_count"])+"</span>"+
			"</span>"+
		"</div>"+
		"</li>";

		$("#project_list").append(item);
	});
}

// Function to load projects from API, make list and add to homepage
function loadProjects() {
	// List of identifiers to ignore (i.e. Not show)
	ignore_these = ["m83", "impossible_line", "leaf", "cancer_gene_runner", "galaxy_zoo_starburst", "galaxy_zoo_quiz"]

	// Get .ist of projects from API annd create items for display
	$.getJSON( "https://api.zooniverse.org/projects/list", function( data ) {
		var projects = [];
		$.each(data, function(i,p) {
		    // As long as it's not in the ignore list, add it to the list using itemHTML function
		    if ($.inArray(p["name"], ignore_these) == -1) {
		    	itemHTML(p);
		    }
		});

	});
}
