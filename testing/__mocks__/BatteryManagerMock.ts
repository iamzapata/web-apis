export class BatteryManager extends EventTarget {
  charging = true
  chargingTime = 1000000
  dischargingTime = Infinity
  level = 0.8
  onchargingchange: EventListener | undefined = undefined
  onchargingtimechange: EventListener | undefined = undefined
  ondischargingtimechange: EventListener | undefined = undefined
  onlevelchange: EventListener | undefined = undefined

  constructor() {
    super()
  }
}

export class BatteryMock {
  static mock(): void {
    if ("getBattery" in navigator) {
      throw new Error("navigator.getBattery is defined")
    }

    const manager = new BatteryManager()

    Object.defineProperty(navigator, "getBattery", {
      configurable: true,
      value: () => Promise.resolve(manager),
    })
  }

  static clean(): void {
    if ("getBattery" in navigator) {
      delete navigator["getBattery"]
    }
  }
}
