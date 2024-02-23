import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconCheck = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m3.556 8.444 2.666 2.667 6.223-6.222"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconCheck)
export default ForwardRef
