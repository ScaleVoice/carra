import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconSearch = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
      clipRule="evenodd"
    />
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.2-5.2" />
  </svg>
)
const ForwardRef = forwardRef(SvgIconSearch)
export default ForwardRef
