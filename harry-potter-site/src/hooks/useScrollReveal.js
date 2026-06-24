export const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export const fadeLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export const fadeRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export const zoomIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: 'easeOut' },
  viewport: { once: true, amount: 0.2 },
}

export const staggerContainer = {
  initial: {},
  whileInView: {},
  transition: { staggerChildren: 0.15 },
  viewport: { once: true, amount: 0.1 },
}