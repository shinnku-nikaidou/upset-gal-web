export const KRKROutlined = (props: React.ComponentProps<'svg'>) => {
  const styles = {
    path: {
      stroke: '#000',
      strokeMiterlimit: 10,
      fill: 'none',
    },
    circle: {
      strokeWidth: 0,
    },
  }

  return (
    <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' {...props}>
      <defs></defs>
      <g id='krkr' data-name='Kirikirioid'>
        <g>
          <path
            style={styles.path}
            d='m19.09,5.02v3.85s-3.52-3.39-3.52-3.39c-1.11,1.6-3.09,3.9-7.77,3.9S.91,6.1.91,5.02C.91,3.94,3.11.66,7.79.66s6.66,2.3,7.77,3.9l3.52-3.39s0,3.85,0,3.85Z'
          />
          <circle style={styles.circle} cx='3.89' cy='5.02' r='1.24' />
        </g>
        <g>
          <path
            style={styles.path}
            d='m.91,15.31v-3.85s3.52,3.39,3.52,3.39c1.11-1.6,3.09-3.9,7.77-3.9s6.88,3.28,6.88,4.36c0,1.08-2.19,4.36-6.88,4.36s-6.66-2.3-7.77-3.9l-3.52,3.39s0-3.85,0-3.85Z'
          />
          <path
            style={styles.path}
            d='m14.51,15.05c.35.62.87,1.38,1.35,1.38s1.09-.65,1.52-1.38'
          />
        </g>
      </g>
    </svg>
  )
}

export default KRKROutlined
