// content.js


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            var filePath = $("a[href^='file']").eq(1).attr("href");

            if( navigator.platform === "MacIntel" ) {
                filePath = filePath.replace(/\\/g, "/");
                filePath = filePath.replace("J:", "/Volumes/snfs");
            }

            chrome.runtime.sendMessage({"message": "open_new_tab", "url": filePath})
        }
    }
);

// Find J drive links on document load
$(document).ready(processJLinks);


// Add custom event to click handler
function processJLinks() {
    var links = document.querySelectorAll(".files-table a")

    for (var i = 0; i < links.length; i++) {
        // For some reason, Chrome on Windows adds an extra '/' to href='file://'?
        // Only J drive links should be in .files-table, so just match all file links
        if (links[i].href && links[i].href.substring(0, 6).toLowerCase() === "file:/") {
            links[i].addEventListener("click", handleClick);
        }
      }

}

// Called if clicking on a link in the files-table
function handleClick (e) {
    // Prevent the browser from following the link
    e.preventDefault();

	var href = e.target.href;

	// Adjust url if Mac
    if (navigator.platform == 'MacIntel') {
		var href = e.target.href.toLowerCase().replace("j:", "/Volumes/snfs");
    }

    chrome.runtime.sendMessage({"message": "open_new_tab", "url": href})
}