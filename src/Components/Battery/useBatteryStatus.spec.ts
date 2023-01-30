import { useBatteryStatus } from "./useBatteryStatus"
import { renderHook, waitFor } from "@testing-library/react"

import {
  BatteryMock,
  BatteryManager,
} from "../../../testing/__mocks__/BatteryManagerMock"

describe("useBatteryStatus", () => {
  beforeEach(() => {
    BatteryMock.mock()
  })

  afterEach(() => {
    BatteryMock.clean()
  })

  it("should return the battery status", async () => {
    const { result } = renderHook(() => useBatteryStatus())

    await waitFor(() => {
      expect(result.current).toEqual({
        batteryStatus: {
          charging: true,
          chargingTime: 1000000,
          dischargingTime: Infinity,
          level: 0.8,
          onchargingchange: undefined,
          onchargingtimechange: undefined,
          ondischargingtimechange: undefined,
          onlevelchange: undefined,
          __proto__: BatteryManager.prototype,
        },
      })
    })

    BatteryMock.clean()
  })
})
