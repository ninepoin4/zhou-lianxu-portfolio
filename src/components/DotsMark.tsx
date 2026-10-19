type Props = {
  className?: string
  dotClassName?: string
  size?: number
}

const delays = [0, 30, 60, 90, 120, 150, 180, 210, 240]

export function DotsMark({ className = '', dotClassName = 'bg-current', size = 18 }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`group inline-grid shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: Math.max(1, Math.round(size * 0.09)),
      }}
    >
      {delays.map((delay, i) => (
        <span
          key={i}
          className={`block rounded-full transition-transform duration-500 ease-soft group-hover:scale-125 ${
            i === 8 ? 'bg-amber' : dotClassName
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}
