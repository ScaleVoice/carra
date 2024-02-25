import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M19 12H5m0 0 7 7m-7-7 7-7"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgArrowLeft)
export default ForwardRef
