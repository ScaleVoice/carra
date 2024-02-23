import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconSliders = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 21 20"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.333 17.5v-5.833M4.333 8.333V2.5M11 17.5V10M11 6.667V2.5M17.667 17.5v-4.167M17.667 10V2.5M1.833 11.667h5M8.5 6.667h5M15.167 13.333h5"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconSliders)
export default ForwardRef
