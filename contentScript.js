chrome.runtime.sendMessage({ action: 'url-get' }, (response) => {
	niftyBadge(response)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'url-update') {
		niftyBadge(request.result)
		sendResponse({ message: 'ok' })
	}

	if (request.action === 'url-connect') {
		sendResponse({ message: 'ok' })
	}

  return true
})

function niftyBadge(object) {
	const greenHex = '#007F29'
	const greenBoxShadowRgb = 'rgb(0, 127, 41, 0.6)'
	const redHex = '#B60A10'
	const redBoxShadowRgb = 'rgb(182 ,10, 16, 0.6)'
	
	if (object && Object.keys(object).length > 0) {
		const url = Object.keys(object)[0]
		const backgroundColor = object[url] === 'yes' ? greenHex : redHex
		const boxShadowColor = object[url] === 'yes' ? greenBoxShadowRgb : redBoxShadowRgb

		let badge = document.createElement('div')
		if (document.getElementById('nifty-badge')) {
			badge = document.getElementById('nifty-badge')
		}
		
		badge.setAttribute('id', 'nifty-badge')
		badge.setAttribute('class', 'nifty-top-right')
		badge.setAttribute('style', `background-color: ${backgroundColor}; box-shadow: 0 0 0 3px ${boxShadowColor}; opacity: 1`)
		badge.innerHTML = object[url] === 'yes' ?
			`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" style="will-change:transform;fill:white;display: block;margin: auto;"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"></path><path d="M14 21.5L9 16.54 10.59 14.97 14 18.35 21.41 11 23 12.58 14 21.5z"></path><title>Checkmark outline</title></svg>` :
			`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" style="will-change:transform;fill:white;display: block;margin: auto;"><path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12	S22.6,28,16,28z"></path><path d="M21.4 23L16 17.6 10.6 23 9 21.4 14.4 16 9 10.6 10.6 9 16 14.4 21.4 9 23 10.6 17.6 16 23 21.4z"></path><title>Close outline</title></svg>`
		document.body.appendChild(badge)

		badge.addEventListener('click', (e) => {
			e.preventDefault()
			badge.setAttribute('style', 'opacity: 0;')
		})
	} else {
		if (document.getElementById('nifty-badge')) {
			document.getElementById('nifty-badge').remove()
		}
	}
}

