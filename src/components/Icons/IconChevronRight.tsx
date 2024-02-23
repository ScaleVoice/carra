import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconChevronRight = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconChevronRight)
export default ForwardRef
