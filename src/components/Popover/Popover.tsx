import { Content, PopoverProps, Portal, Root, Trigger } from "@radix-ui/react-popover"
import { FC, ReactNode } from "react"

type Props = PopoverProps & {
  trigger: ReactNode
}

export const Popover: FC<Props> = ({ children, trigger }) => {
  return (
    <Root>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Content>{children}</Content>
      </Portal>
    </Root>
  )
}
