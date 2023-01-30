import styles from "./BatteryLevel.module.css"

interface BatteryLevelProps {
  level: number
}
const BatteryLevel = ({ level = 0 }: BatteryLevelProps) => {
  const percentage = Math.round(level * 100)

  const getColor = () => {
    if (percentage > 70) return styles.BatteryLevel__Green
    if (percentage > 50) return styles.BatteryLevel__Yellow
    if (percentage > 10) return styles.BatteryLevel__Orange
    return styles.BatteryLevel__Red
  }

  return (
    <div className={[styles.BatteryLevel, getColor()].join(" ")}>
      {percentage}%
    </div>
  )
}

export { BatteryLevel }
