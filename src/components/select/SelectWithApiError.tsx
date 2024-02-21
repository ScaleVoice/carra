import { Select } from 'components/select/Select'
import { TextBody } from 'components/text/Text'
import { ComponentProps, ReactNode } from 'react'

type Props = Omit<ComponentProps<typeof Select>, 'error'> & {
  error?: unknown
  refetch?: () => void
  button: ReactNode
}

export function SelectWithApiError(props: Props) {
  const { error, refetch, button, ...rest } = props
  const { isLoading } = rest

  return (
    <Select
      {...rest}
      error={
        error && !isLoading ? (
          <TextBody variant="caption" css={{ textAlign: 'center' }}>
            {button}
          </TextBody>
        ) : null
      }
    />
  )
}
