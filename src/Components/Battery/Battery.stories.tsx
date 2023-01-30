import { Battery } from "./"

export default { component: Battery }

interface ArgTypes extends React.ComponentProps<typeof Battery> {}

export const Charged = {
  args: {
    isCharged: true,
    level: 0.9,
  } as ArgTypes,
}

export const OnBattery = {
  args: {
    isCharged: false,
    level: 0.5,
  } as ArgTypes,
}

export const Charging = {
  args: {
    isCharging: true,
    level: 0.1,
  } as ArgTypes,
}
