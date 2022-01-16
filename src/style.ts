import debounce from 'lodash/debounce'

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const setCustomProperty = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

window.addEventListener('resize', debounce(setCustomProperty, 60))
setCustomProperty()
