import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconLogout = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.667 18.333h4.166c.92 0 1.667-.746 1.667-1.666V3.332c0-.92-.746-1.666-1.667-1.666h-4.167"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.167 13.333 12.5 10 9.166 6.667M12.5 10h-10"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconLogout)
export default ForwardRef
