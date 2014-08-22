// Function to load projects from API, make list and add to homepage
function loadProjects() {
	// List of identifiers to ignore (i.e. Not show)
	ignore_these = ["m83", "impossible_line", "leaf", "cancer_gene_runner", "galaxy_zoo_starburst", "galaxy_zoo_quiz"]
	
	// Get .ist of projects from API annd create items for display
	$.getJSON( "https://api.zooniverse.org/projects/list", function( data ) {
		var projects = [];
		$.each( data, function( i,p ) {
			// Each item is forone project
			item = "<li><div title=\""+p["display_name"]+"\">"+
				"<p><a href=\"https://api.zooniverse.org/projects/"+p["name"]+"/status\" target=\"_blank\"><img src=\"images/"+p["name"]+".jpg\" alt=\""+p["display_name"]+"\" /></href></p>"+
				"</div></li>";
		    // As long as it's not in the ignore list, add it to the list
		    if ($.inArray(p["name"], ignore_these) == -1) {
		    	projects.push(item);
		    }
		});
		// Once complete, add list to <ul> on main page
		$("#project_list").append(projects.join( "" ));

	});
}