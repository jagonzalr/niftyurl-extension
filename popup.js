document.addEventListener('DOMContentLoaded', (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0]
    const url = tab.url
    chrome.tabs.sendMessage(tab.id, { action: 'url-connect' }, () => {
      chrome.storage.sync.get(url, (result) => {
        niftySetUrl(result)
      })
    })
  })

  document.getElementById('nifty-yes').addEventListener('click', e => {
  	e.preventDefault()
  	niftySendUrl('yes')
  })

  document.getElementById('nifty-no').addEventListener('click', e => {
  	e.preventDefault()
  	niftySendUrl('no')
  })

  document.getElementById('nifty-clear').addEventListener('click', e => {
    e.preventDefault()
    niftySendUrl('clear')
  })
})

function niftySetUrl(result) {
  if (Object.keys(result).length > 0) {
  	const url = Object.keys(result)[0]
  	document.getElementById('nifty-url-result').innerHTML = result[url]
    document.getElementById('nifty-clear').setAttribute('style', 'opacity: 1;')
  } else {
    document.getElementById('nifty-url-result').innerHTML = ''
    document.getElementById('nifty-clear').setAttribute('style', 'opacity: 0;')
  }
}

function niftySendUrl(value) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0]
    const url = tab.url
    niftySetOrClear(value, url, () => {
      chrome.storage.sync.get(url, (result) => {
        chrome.tabs.sendMessage(tab.id, { action: 'url-update', result }, () => {
          niftySetUrl(result)
        })
      })
    })
  })
}

function niftySetOrClear(value, url, cb) {
  if (value === 'clear') {
    chrome.storage.sync.remove(url, () => cb())
  } else {
    chrome.storage.sync.set({ [url]: value }, () => cb())
  }
}