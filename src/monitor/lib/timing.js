import onload from '../utils/onload'
import getSelector from '../utils/getSelector'
import getLastEvent from '../utils/getLastEvent'
export function timing() {
  let FMP
  let LCP
  // 增加一个性能条目的观察者
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
    observer.disconnect()
  }).observe({
    entryTypes: ['element']
  })

  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    LCP = perfEntries[perfEntries.length - 1]
    observer.disconnect()
  }).observe({
    entryTypes: ['largest-contentful-paint']
  })

  new PerformanceObserver((entryList, observer) => {
    let lastEvent = getLastEvent()
    let firstInput = entryList.getEntries()[0]
    if (firstInput) {
      // 插值是处理的延迟
      let inputDelay = firstInput.processingStart - firstInput.startTime
      // 点页面 到 处理 之间的延迟
      let duration = firstInput.duration
      if (inputDelay > 0 || duration > 0) {
        console.log('FID',{
          kind: 'experience',
          type: 'firstInputDelay',
          inputDelay,
          duration,
          startTime: firstInput.startTime,
          selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
        })
      }
    }
    observer.disconnect()
  }).observe({
    type: 'first-input',
    buffered: true
  })

  onload(() => {
    const {
      fetchStart,
      connectStart,
      connectEnd,
      requestStart,
      responseStart,
      responseEnd,
      domLoading,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      loadEventStart
    } = performance.timing
    console.log({
      kind: 'experience',
      type: 'timing',
      type: 'timing',
      connectTime: connectEnd - connectStart,
      ttfbTime: responseStart - requestStart,
      responseTime: responseEnd - responseStart,
      parseDOMTime: loadEventStart - domLoading,
      domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
      timeToInteractive: domInteractive - fetchStart,
      loadTime: loadEventStart - fetchStart
    })
    console.log({
      FMP,
      LCP,
      FP: performance.getEntriesByName('first-paint')[0],
      FCP: performance.getEntriesByName('first-contentful-paint')[0]
    })
  })
}