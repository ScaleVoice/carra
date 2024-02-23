import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconSuccess = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7 9 18l-5-5" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconSuccess)
export default ForwardRef
