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
