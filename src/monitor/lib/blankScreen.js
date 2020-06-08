import getSelector from "../utils/getSelector"
import onload from '../utils/onload'

export function blankScreen() {
  let wrapperElements = ['html', 'body']
  let emptyPoints = 0
  function getSelector(element) {
    if (element.id) {
      return '#' + id
    } else if (element.className) {
      return '.' + element.className.split(' ').filter(item => !!item).join('.')
    } else {
      return element.nodeName.toLowerCase()
    }
  }
  function isWrapper(element) {
    let selector = getSelector(element)
    if (wrapperElements.indexOf(selector) != -1) {
      emptyPoints++
    }
  }
  onload(_ => {
    for (let i = 0; i <= 9; i++) {
      let xElements = document.elementsFromPoint(
        window.innerWidth / 10 * i,
        window.innerHeight / 2
      )
      let yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 10 * i
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }
    if (emptyPoints > 16) {
      let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      console.log({
        kind: 'stability',
        type: 'blank',
        emptyPoints,
        screen: window.screen.width + 'x' + window.screen.height,
        viewPoint: window.innerWidth + 'x' + window.innerHeight,
        selector: getSelector(centerElements[0])
      })
    }
  })
}