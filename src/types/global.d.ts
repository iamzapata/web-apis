interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

interface Navigator extends Navigator {
  getBattery(): Promise<BatteryManager>
}
