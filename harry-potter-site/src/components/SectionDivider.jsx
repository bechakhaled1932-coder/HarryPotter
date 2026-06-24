function SectionDivider({ flipY = false, color = '#0d0d0d' }) {
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      transform: flipY ? 'scaleY(-1)' : 'none',
    }}>
      <svg
        viewBox="0 0 1200 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '80px' }}
      >
        <path
          d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export default SectionDivider