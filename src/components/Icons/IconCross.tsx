import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconCross = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13 5 5M5 13l8-8" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconCross)
export default ForwardRef
