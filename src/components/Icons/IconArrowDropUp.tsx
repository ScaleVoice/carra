import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconArrowDropUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 6 4"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fill="currentColor"
      d="M.554 2.092 2.477.212a.752.752 0 0 1 1.048 0l1.923 1.88c.468.457.134 1.241-.527 1.241H1.074c-.661 0-.988-.784-.52-1.24Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconArrowDropUp)
export default ForwardRef
