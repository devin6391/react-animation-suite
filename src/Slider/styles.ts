import * as React from 'react'

export interface ISliderCss {
  rtgList: React.CSSProperties
  rtgWrapper: React.CSSProperties
}

const getSliderStyles = (): ISliderCss => ({
  rtgList: {
    display: 'flex',
    margin: 'auto',
    position: 'relative'
  },
  rtgWrapper: {
    left: 0,
    position: 'absolute',
    right: 0
  }
})

export default getSliderStyles
