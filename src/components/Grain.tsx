export function Grain() {
  return (
    <>
      <div
        aria-hidden="true"
        className="noise pointer-events-none fixed inset-[-60%] z-[70] opacity-[0.045] mix-blend-multiply will-change-transform"
        style={{ animation: 'grain 1.2s steps(6) infinite' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[69]"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 60%, rgba(92,70,40,0.06) 100%), radial-gradient(90% 90% at 50% 100%, transparent 65%, rgba(92,70,40,0.05) 100%)',
        }}
      />
    </>
  )
}
