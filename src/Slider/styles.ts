import * as React from 'react'

export interface ISliderCss {
  rtgList: React.CSSProperties
  rtgWrapper: React.CSSProperties
}

const getSliderStyles = (): ISliderCss => ({
  rtgList: {
    display: 'flex',
    position: 'relative',
    margin: 'auto'
  },
  rtgWrapper: {
    position: 'absolute',
    left: 0,
    right: 0
  }
})

export default getSliderStyles
