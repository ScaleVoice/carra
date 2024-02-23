import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconAuctions = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M9.6 11.52 19.68 21.602a1.358 1.358 0 0 0 1.921-1.92L11.52 9.598M7.678 5.759l-.96-.96a1.358 1.358 0 1 0-1.92 1.92l.96.96M7.551 13.569 13.57 7.55M9.727 3.71 3.71 9.727M5.278 14.88A1.358 1.358 0 1 0 7.2 12.96l-2.88-2.88A1.36 1.36 0 0 0 2.397 12l2.88 2.88ZM12.96 7.202a1.36 1.36 0 0 0 1.92-1.924L12 2.398a1.357 1.357 0 1 0-1.92 1.92l2.88 2.884Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconAuctions)
export default ForwardRef
