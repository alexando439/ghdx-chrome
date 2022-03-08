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


// If mac, add custom event to click handler
function processJLinks() {
    // Quit if not Mac
    if (navigator.platform !== 'MacIntel') {
        return;
    }

    var links = document.querySelectorAll(".files-table a")

    for (var i = 0; i < links.length; i++) {
        // Only bind to J drive links
        if (links[i].href && links[i].href.substring(0, 10) === "file://j:/") {
            links[i].addEventListener("click", handleClick);
        }
      }

}

// Handle clicking on a J drive link
// Called only if mac and known J drive link
function handleClick (e) {
    // Prevent the browser from following the link
    e.preventDefault();

    // Replace link with Mac link
    var href = e.target.href.replace("j:", "/Volumes/snfs");

    chrome.runtime.sendMessage({"message": "open_new_tab", "url": href})
}