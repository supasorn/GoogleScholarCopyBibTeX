chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var url = request.url;
    fetch(url)
      .then(response => response.text())
      .then(v => sendResponse(v))
    return true;  // Will respond asynchronously.
  });
