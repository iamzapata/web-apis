import { useEffect, useState } from "react"

const useBatteryStatus = (): { batteryStatus: BatteryManager | {} } => {
  const [batteryStatus, setBatteryStatus] = useState<BatteryManager | {}>({})

  if (navigator.getBattery === undefined) {
    const errorMessage = "Your browser does not support the Battery Status API"
    console.error(errorMessage)

    throw new Error(errorMessage)
  }

  useEffect(() => {
    let detachEventListeners: () => void = () => {}

    const attachEventListeners = async () => {
      try {
        const battery = await navigator.getBattery()

        const updateBatteryStatus = () => {
          console.log("%c updateBatteryStatus", "color: #00b33c", battery)
          setBatteryStatus(battery)
        }

        battery.addEventListener("chargingchange", updateBatteryStatus)
        battery.addEventListener("levelchange", updateBatteryStatus)
        battery.addEventListener("chargingtimechange", updateBatteryStatus)
        battery.addEventListener("dischargingtimechange", updateBatteryStatus)

        setBatteryStatus(battery)

        detachEventListeners = () => {
          battery.removeEventListener("chargingchange", updateBatteryStatus)
          battery.removeEventListener("levelchange", updateBatteryStatus)
          battery.removeEventListener("chargingtimechange", updateBatteryStatus)
          battery.removeEventListener(
            "dischargingtimechange",
            updateBatteryStatus
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    attachEventListeners()

    return detachEventListeners
  }, [setBatteryStatus])

  return { batteryStatus }
}

export { useBatteryStatus }
