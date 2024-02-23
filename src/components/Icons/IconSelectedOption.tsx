import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconSelectedOption = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx={10} cy={10} r={10} fill="currentColor" />
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 9.75 9.16 12 13 8" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconSelectedOption)
export default ForwardRef
