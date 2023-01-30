import { BatteryLevel } from "."
import { expect } from "@storybook/jest"
import { within } from "@storybook/testing-library"
import { PlayFunctionContext, StoryContext } from "@storybook/types"

export default { component: BatteryLevel }

export const Full = { args: { level: 1 } }

export const Half = { args: { level: 0.55 } }

export const Low = { args: { level: 0.2 } }

export const Empty = { args: { level: 0.09 } }
;[
  [Full, "_BatteryLevel__Green"],
  [Half, "_BatteryLevel__Yellow"],
  [Low, "_BatteryLevel__Orange"],
  [Empty, "_BatteryLevel__Red"],
].forEach(([story, className]) => {
  story.play = ({ canvasElement }: PlayFunctionContext) => {
    const canvas = within(canvasElement)

    const text = canvas.getByText(`${Math.round(story.args.level * 100)}%`)

    expect(text).toBeInTheDocument()
    // expect class to containg substring
    expect(text.className).toContain(className)
  }
})
