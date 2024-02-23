import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconCallCustomer = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 24 26"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.322 3.549a8.989 8.989 0 0 1 2.251 16.5v4.2"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.322 12.25a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.822 9.25V2.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v6.75"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.297}
      d="m4.073 16.76-.936-.234a1.5 1.5 0 0 1-.884-2.287l1.82-2.729v-.75c0-3.542 2.868-6.51 6.749-7.3M8.573 24.25v-2.24l-1.007.168c-.414.07-.838.052-1.244-.053M13.072 12.25a7.5 7.5 0 0 1-7.5 7.5h-1.5"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconCallCustomer)
export default ForwardRef
