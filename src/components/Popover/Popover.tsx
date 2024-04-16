import { Content, PopoverProps, Portal, Root, Trigger } from "@radix-ui/react-popover"
import { FC, ReactNode } from "react"

type Props = PopoverProps & {
  trigger: ReactNode
  asChild?: boolean
  orientation?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

export const Popover: FC<Props> = ({ children, align, trigger, orientation, asChild = false }) => {
  return (
    <Root>
      <Trigger asChild={asChild}>{trigger}</Trigger>
      <Portal>
        <Content align={align} side={orientation} className="z-10">
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
