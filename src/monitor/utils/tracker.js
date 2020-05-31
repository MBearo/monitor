const userAgent = require('user-agent')
function getExtraData() {
  return {
    title: document.title,
    url: location.url,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent)
  }
}
class SendTracker {
  constructor() {
    this.url = ''
    this.xhr = new XMLHttpRequest
  }
  send(data = {}) {
    let body = JSON.stringify(data)
    this.xhr.open('POST', this.url, true)
    //this.xhr.setRequestHeader()
    this.xhr.onload = function () {

    }
    this.xhr.onerror = function () {

    }
    this.xhr.send(body)
  }
}
export default new SendTracker()