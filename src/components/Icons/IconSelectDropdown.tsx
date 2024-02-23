import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconSelectDropdown = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path stroke="#027275" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconSelectDropdown)
export default ForwardRef
