import { Flex } from 'components/Flex'
import { Spinner } from 'components/spinner/Spinner'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<typeof Spinner> {
  className?: string
}

export function SpinnerCentered(props: Props) {
  const { className, ...spinnerProps } = props

  return (
    <Flex variant="row" align="center" justify="center" className={className}>
      <Spinner {...spinnerProps} />
    </Flex>
  )
}
