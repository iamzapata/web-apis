import { BatteryIcon } from "../Icons"
import { BatteryLevel } from "../BatteryLevel"
import styles from "./Battery.module.css"

interface BatteryProps {
  isCharged: boolean
  isCharging: boolean
  level: number
}
const Battery = ({ isCharged, isCharging, level }: BatteryProps) => {
  return (
    <div className={styles.Battery}>
      <BatteryIcon isCharged={isCharged} isCharging={isCharging} />
      <BatteryLevel level={level} />
    </div>
  )
}

export { Battery }
