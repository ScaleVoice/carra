import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconCircleCheck = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.192 20.384a8.192 8.192 0 1 0 0-16.384 8.192 8.192 0 0 0 0 16.384Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15.842 9.81-3.966 5.289a1.026 1.026 0 0 1-1.544.11L8.284 13.16"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconCircleCheck)
export default ForwardRef
