import { BatteryIcon } from "../Icons"
import { useBatteryStatus } from "./useBatteryStatus"
import { BatteryLevel } from "../BatteryLevel"
import styles from "./Battery.module.css"

const Battery = () => {
  const { batteryStatus } = useBatteryStatus()
  const { level, charging } = batteryStatus as BatteryManager

  const isCharged = level >= 0.7
  const isCharging = charging

  console.log("%c batteryStatus", "color: #c80000", batteryStatus)

  return (
    <div className={styles.Battery}>
      <BatteryIcon isCharged={isCharged} isCharging={isCharging} />
      <BatteryLevel level={level} />
    </div>
  )
}

export { Battery }
