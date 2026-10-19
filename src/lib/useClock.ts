import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function useClock() {
  const [time, setTime] = useState(() => formatter.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])
  return time
}
