export const checkFinishZone = (total: number, current: number) => {
  const sensitivity = total * 0.6
  const thresholdReached = sensitivity < current

  return thresholdReached
}

export const checkWindowScroll = () => {
  const scrollBottomLine = window.pageYOffset + window.innerHeight

  return checkFinishZone(document.body.clientHeight, scrollBottomLine)
}
