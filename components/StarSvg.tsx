import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path, SvgProps } from 'react-native-svg'

type Props = {
  isActive: boolean
} & SvgProps

export default function StarSvg({ isActive, ...props }: Props) {
  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 36 33"
      fill="none"
      {...props}
    >
      <Path
        d="M18 0l4.041 12.438H35.12l-10.58 7.687 4.041 12.437L18 24.875 7.42 32.562l4.041-12.437-10.58-7.687h13.078L18 0z"
        fill={isActive ? '#fff' : '#00000040'}
      />
    </Svg>
  )
}
