import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconExternalLink = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.867}
      clipPath="url(#IconExternalLink_svg__a)"
    >
      <path d="M6.289 9.57 14.999 1M15 5.898V1h-4.978M8.078 4.11H1.544A.544.544 0 0 0 1 4.656v9.8a.544.544 0 0 0 .544.545h9.8a.544.544 0 0 0 .545-.545V7.922" />
    </g>
    <defs>
      <clipPath id="IconExternalLink_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgIconExternalLink)
export default ForwardRef
