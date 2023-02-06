import { Battery, BatteryCharging, IconProps } from "react-feather"

interface BatteryProps extends IconProps {
  isCharged?: boolean
  isCharging?: boolean
}
const BatteryIcon = ({ isCharged, isCharging, ...props }: BatteryProps) => {
  if (isCharged) return <Battery fill="currentColor" {...props} />

  if (isCharging) return <BatteryCharging {...props} />

  return <Battery {...props} />
}

export { BatteryIcon }
