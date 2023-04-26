export const animateFromLeft = {
  offscreen: { x: '-20vw', opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type:"spring", bounce:0, duration: 2}
  }
}

export const animateFromLeftWithOpacity = {
  offscreen: { x: '-20vw', opacity: 1 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type:"spring", bounce:0, duration: 1}
  }
}

export const animateFromRight = {
  offscreen: { x: '+20vw', opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type:"spring", bounce:0, duration: 0.5}
  }
}

export const animateFromAboveSlower = {
  offscreen: { y: '+5vw', opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type:"spring", bounce:0, duration: 5}
  }
}

export const animateOpacity = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: { type:"spring", bounce:0, duration: 2}
  }
}

export const animateVibrate = {
  offscreen: { x: '-5vw', opacity: 1 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", bounce:1, duration: 0.5}
  }
}