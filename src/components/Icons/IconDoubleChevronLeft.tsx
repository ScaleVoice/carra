import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconDoubleChevronLeft = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="m11 7-5 5 5 5M18 7l-5 5 5 5"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconDoubleChevronLeft)
export default ForwardRef
