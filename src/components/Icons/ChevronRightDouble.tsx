import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgChevronRightDouble = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="#6F42C1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M4 11.333 7.333 8 4 4.667m4.667 6.666L12 8 8.667 4.667"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgChevronRightDouble)
export default ForwardRef
