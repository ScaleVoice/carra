import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconHistory = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 26 22"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.5 21a9.75 9.75 0 1 0-9.75-9.75V12"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.75 8.998 3 3 3-3M13.75 5.248v6.75H19"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconHistory)
export default ForwardRef
