import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconNotAllowed = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM3.667 14.333 14.333 3.667"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconNotAllowed)
export default ForwardRef
