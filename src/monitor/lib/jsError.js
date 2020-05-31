import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
export function injectJsError() {
  window.addEventListener('error', function (event) {
    console.log(event);
    let lastEvent = getLastEvent()
    console.log(lastEvent);
    let log = {
      kind: 'stability',//监控指标的大类
      type: 'error',//小类型
      errorType: 'jsError',//js执行报的错
      url: '',
      message: event.message,
      filename: event.filename,
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : ''
    }
    console.log(log);
  })
  window.addEventListener('unhandledrejection', event => {
    let lastEvent = getLastEvent()
    let message
    let filename
    let line = 0
    let column = 0
    let stack = ''
    let reason = event.reason
    if (typeof reason === 'string') {
      message = reason
    } else if (typeof reason === 'object') {
      if (reason.stack) {
        let matchResult = reason.stack.mathch(/at\s+(.+):(\d+):(\d+)/)
        filename = matchResult[1]
        line = matchResult[2]
        column = matchResult[3]
      }
      stack = getLines()
    }
  })
}
function getLines(stack) {
  return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
}