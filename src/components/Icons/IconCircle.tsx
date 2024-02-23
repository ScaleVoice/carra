import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconCircle = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx={10} cy={10} r={9} stroke="currentColor" strokeWidth={2} />
  </svg>
)
const ForwardRef = forwardRef(SvgIconCircle)
export default ForwardRef
