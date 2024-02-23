import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconError = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M10.29 4.86 1.82 19a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 4.86a2 2 0 0 0-3.42 0Z"
      clipRule="evenodd"
    />
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v4" />
    <circle cx={12} cy={18} r={1} fill="currentColor" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconError)
export default ForwardRef
