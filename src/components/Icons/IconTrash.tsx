import type { SVGProps } from "react"
import { Ref, forwardRef } from "react"
const SvgIconTrash = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 5h15" />
    <path
      fill="currentColor"
      d="M16.833 5a1 1 0 1 0-2 0h2ZM5.167 5a1 1 0 1 0-2 0h2Zm.5 0a1 1 0 1 0 2 0h-2Zm6.666 0a1 1 0 1 0 2 0h-2Zm2.5 0v11.667h2V5h-2Zm0 11.667a.667.667 0 0 1-.666.666v2a2.667 2.667 0 0 0 2.666-2.666h-2Zm-.666.666H5.833v2h8.334v-2Zm-8.334 0a.667.667 0 0 1-.666-.666h-2a2.667 2.667 0 0 0 2.666 2.666v-2Zm-.666-.666V5h-2v11.667h2ZM7.667 5V3.333h-2V5h2Zm0-1.667c0-.368.298-.667.666-.667v-2a2.667 2.667 0 0 0-2.666 2.667h2Zm.666-.667h3.334v-2H8.333v2Zm3.334 0c.368 0 .666.299.666.667h2A2.667 2.667 0 0 0 11.667.667v2Zm.666.667V5h2V3.333h-2Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.333 9.167v5M11.667 9.167v5"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgIconTrash)
export default ForwardRef
