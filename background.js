chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.tabs.insertCSS(tabId, {
    file: 'contentScript.css'
  }, () => {
  	chrome.tabs.executeScript(tabId, {
	    file: 'contentScript.js'
	  })
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'url-get') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs && tabs.length > 0) {
				const url = tabs[0].url
		    chrome.storage.sync.get(url, (result) => {
		    	sendResponse(result)
		    })
			}
	  })
	}

  return true
})