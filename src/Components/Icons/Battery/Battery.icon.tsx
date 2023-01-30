import { Battery, BatteryCharging } from "react-feather"

type BatteryProps = {
  isCharged?: boolean
  isCharging?: boolean
}
const BatteryIcon = ({ isCharged, isCharging }: BatteryProps) => {
  if (isCharged) return <Battery fill="currentColor" />

  if (isCharging) return <BatteryCharging />

  return <Battery />
}

export { BatteryIcon }
