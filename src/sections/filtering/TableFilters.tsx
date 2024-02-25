import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { ButtonCircle } from 'components/button/Button'
import { Spacer } from 'components/spacer/Spacer'
import { TextHeader } from 'components/text/Text'
import { Tooltip } from 'components/tooltip/Tooltip'
import IconDoubleChevronLeft from 'core/images/icons/IconDoubleChevronLeft.svg'
import { styledScrollbars } from 'core/styles/common'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { FilterConfig } from 'sections/filtering/TableFiltersToolbar'

interface Props {
  openedFilters: boolean
  filters: FilterConfig[]
  toggleFiltersMenu: () => void
}

const asideAnimationVariants = {
  open: {
    width: '100%',
    opacity: 1
  },
  closed: {
    width: 0,
    opacity: 0
  }
}

export function TableFilters({
  filters,
  openedFilters,
  toggleFiltersMenu
}: Props) {
  return (
    <aside
      css={css`
        display: flex;
        flex-direction: column;
        padding: ${size(5)};

        height: calc(100vh - ${size(19)});
        overflow-y: ${openedFilters ? 'auto' : 'hidden'};
        overflow-x: hidden;

        ${styledScrollbars}

        border-right: 2px solid ${color('night-l-700')};
      `}
    >
      <TableFiltersHeader
        openedFilters={openedFilters}
        toggleFiltersMenu={toggleFiltersMenu}
      />

      <Spacer size={4} axis="vertical" />

      <motion.div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
        initial="closed"
        variants={asideAnimationVariants}
        animate={openedFilters ? 'open' : 'closed'}
      >
        {filters.map(({ Component, disabled, disableHint }, index) => (
          <Fragment key={index}>
            <Tooltip
              isDisabled={!disabled}
              content={disableHint}
              placement="top"
            >
              {Component}
            </Tooltip>
          </Fragment>
        ))}
      </motion.div>
    </aside>
  )
}

function TableFiltersHeader({
  openedFilters,
  toggleFiltersMenu
}: Omit<Props, 'filters'>) {
  const { t } = useTranslation()

  return (
    <Flex
      variant="row"
      justify={openedFilters ? 'between' : 'end'}
      align="center"
    >
      <motion.div
        initial="closed"
        variants={asideAnimationVariants}
        animate={openedFilters ? 'open' : 'closed'}
      >
        <TextHeader variant="h6" as="h6" color="black">
          {t('filters')}
        </TextHeader>
      </motion.div>

      <ButtonCircle
        variant="outline"
        css={css`
          padding: ${size(2)};
          width: ${size(10)};
          height: ${size(10)};
        `}
        onClick={toggleFiltersMenu}
      >
        <IconDoubleChevronLeft
          css={css`
            rotate: ${openedFilters ? 0 : '-180deg'};
          `}
        />
      </ButtonCircle>
    </Flex>
  )
}
