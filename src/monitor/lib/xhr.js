import tracker from '../utils/tracker'
export function injectXHR() {
  const XMLHttpRequest = window.XMLHttpRequest
  let oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url, async) {
    //如果是上报的路由要过滤掉
    this.logData = { method, url, async }
    return oldOpen.apply(this, arguments)
  }

  let oldSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      const startTime = Date.now()
      const handler = type => event => {
        let duration = Date.now() - startTime
        let status = this.statusText
        let statusText = this.statusText
        console.log({
          kind: 'atability',
          type: 'xhr',
          eventType: type,
          pathname: this.logData.url,
          status: status + '-' + statusText,
          duration,
          response: this.response ? JSON.stringify(this.response) : '',
          params: body || ''
        })
        // tracker.send({
        //   kind: 'atability',
        //   type: 'xhr',
        //   eventType: type,
        //   pathname: this.logData.url,
        //   status: status + '-' + statusText,
        //   duration,
        //   response: this.response ? JSON.stringify(this.response) : '',
        //   params: body || ''
        // })
      }
      this.addEventListener('load', handler('load'), false)
      this.addEventListener('error', handler('error'), false)
      this.addEventListener('abort', handler('abort'), false)
    }
    return oldSend.apply(this, arguments)
  }
}