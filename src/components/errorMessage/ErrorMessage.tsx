import { TextBody } from 'components/text/Text'
import { color } from 'core/styles/variables'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof TextBody>

export function ErrorMessage(props: Props) {
  return (
    <TextBody variant="caption" css={{ color: color('warning') }} {...props}>
      {props.children}
    </TextBody>
  )
}
