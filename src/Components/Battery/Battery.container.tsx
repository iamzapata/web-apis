import { useBatteryStatus } from "./useBatteryStatus"
import { Battery } from "./Battery"

const BatteryContainer = () => {
  const { batteryStatus } = useBatteryStatus()
  const { level, charging } = batteryStatus as BatteryManager

  const isCharged = level >= 0.9
  const isCharging = charging

  console.log("%c batteryStatus", "color: #c80000", batteryStatus)

  return <Battery isCharged={isCharged} isCharging={isCharging} level={level} />
}

export { BatteryContainer }
