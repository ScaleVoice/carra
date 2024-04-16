import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgCar = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 16 17"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="#A98EDA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.033 7.068-.95-2.576a1.523 1.523 0 0 0-.462-.72 1.11 1.11 0 0 0-.718-.272H5.097a1.11 1.11 0 0 0-.718.272c-.21.177-.372.428-.461.72l-.951 2.576M13.033 11.655v.932a.874.874 0 0 1-.293.646 1.05 1.05 0 0 1-.707.267 1.05 1.05 0 0 1-.707-.267.874.874 0 0 1-.293-.646v-.912M5.13 11.655v.932a.874.874 0 0 1-.293.646 1.05 1.05 0 0 1-.707.267 1.05 1.05 0 0 1-.707-.267.874.874 0 0 1-.293-.646v-.912"
    />
    <path
      stroke="#A98EDA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.827 7.068h10.346c.296 0 .58.143.79.398.21.255.328.6.328.961v2.549a.76.76 0 0 1-.164.48.514.514 0 0 1-.395.2H2.267a.514.514 0 0 1-.395-.2.76.76 0 0 1-.164-.48V8.427c0-.36.118-.706.328-.961.21-.255.494-.398.79-.398v0Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgCar)
export default ForwardRef
