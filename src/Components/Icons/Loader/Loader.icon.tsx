import { useRef, RefObject, useLayoutEffect } from "react"
import { Loader, IconProps } from "react-feather"

interface LoaderIconProps extends IconProps {
  isLoading?: boolean
  ref?: RefObject<SVGElement>
}
const LoaderIcon = ({ ...props }: LoaderIconProps) => {
  const { isLoading } = props
  const iconRef = useRef<SVGElement>(null)

  useLayoutEffect(() => {
    if (!isLoading || !iconRef.current) return

    const icon = iconRef.current

    icon.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 2000,
        iterations: Infinity,
        easing: "linear",
      }
    )
  }, [iconRef.current, isLoading])

  return <Loader {...props} ref={iconRef} />
}

export { LoaderIcon }
