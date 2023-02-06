import { BatteryIcon } from "./Battery.icon"

export default { component: BatteryIcon }

export const Charged = { args: { isCharged: true } }

export const OnBattery = { args: { onBattery: true } }

export const Charging = { args: { isCharging: true } }
