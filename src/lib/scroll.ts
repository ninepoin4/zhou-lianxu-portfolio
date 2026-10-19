import type Lenis from 'lenis'

let instance: Lenis | null = null
let lockCount = 0

export function registerLenis(next: Lenis | null) {
  instance = next
}

export function scrollToId(id: string, offset = -64) {
  if (id === 'top') {
    scrollToTop()
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.4 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function setScrollLocked(locked: boolean) {
  if (locked) {
    lockCount += 1
    if (lockCount === 1) {
      document.documentElement.classList.add('lenis-stopped')
      document.body.style.overflow = 'hidden'
      instance?.stop()
    }
  } else {
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
      instance?.start()
    }
  }
}
