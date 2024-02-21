import { Spacer } from 'components/spacer/Spacer'
import { ReactNode } from 'react'
import { SNote } from './Note.styled'

import { css } from '@emotion/react'
import { Dot } from 'components/Dot'
import { TextBody } from 'components/text/Text'
import { color } from 'core/styles/variables'
import { format } from 'date-fns'

import { Flex } from 'components/Flex'

import { parseUTCDate } from 'utils/date'

interface Props {
  children: ReactNode
  createdAt: string
  createdBy?: string
  tag?: ReactNode
  className?: string
}

export function Note(props: Props) {
  return (
    <SNote className={props.className}>
      <Flex variant="row" align="center" gap={2}>
        <TextBody size="small">
          {format(parseUTCDate(props.createdAt), 'dd.MM. HH:mm')}
        </TextBody>
        {props.createdBy && (
          <>
            <Dot />
            <TextBody size="small">{props.createdBy}</TextBody>
            {props.tag}
          </>
        )}
      </Flex>
      <Spacer size={2} />
      <TextBody
        size="small"
        css={css`
          color: ${color('night-d-200')};
        `}
      >
        {props.children}
      </TextBody>
    </SNote>
  )
}
