import { css } from '@emotion/react'
import { Flex } from 'components/Flex'
import { ButtonTransparent } from 'components/button/Button'
import { InputSearch } from 'components/inputSearch/InputSearch'
import { TextBody } from 'components/text/Text'
import IconTrash from 'core/images/icons/IconTrash.svg'
import { size } from 'core/styles/spacing'
import { color } from 'core/styles/variables'
import equal from 'fast-deep-equal'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import { isNotNil } from '../../utils/types'
import { SActiveFilters, SFilterMenu, SWrapper } from './TableFilters.styled'
import { getSanitizedFiltersWithoutPage, useSearch } from './TableFilters.utils'
import { State, initialState } from './reducer/FiltersState'

export interface FilterConfig {
  Component: ReactNode
  value?: ReactNode
  disabled?: boolean
  disableHint?: string
}

interface Props {
  activeFilters: State[keyof State]['filters']
  initialFilters: (typeof initialState)[keyof State]['filters']
  filters: FilterConfig[]
  defaultSearch?: string
  onSearch: (value: string | undefined) => void
  onClearAll: () => void
}

export const TableFiltersToolbar = ({
  filters,
  onClearAll,
  onSearch,
  defaultSearch,
  initialFilters,
  activeFilters
}: Props) => {
  const { t } = useTranslation()
  const { search, setSearch } = useSearch(defaultSearch)

  return (
    <SWrapper variant="row" gap={4}>
      <SFilterMenu>
        <InputSearch
          noOutline
          value={search}
          onChange={value => setSearch(value)}
          onClear={() => onSearch(undefined)}
          onSubmit={() => onSearch(search)}
          placeholder={t('header_search_placeholder')}
        />
      </SFilterMenu>

      <Flex
        variant="row"
        justify="between"
        gap={8}
        css={css`
          width: 100%;
        `}
      >
        <SActiveFilters variant="row">
          {filters.filter(x => isNotNil(x.value)).map(filter => filter.value)}
        </SActiveFilters>

        {(!!defaultSearch ||
          !equal(
            getSanitizedFiltersWithoutPage(initialFilters),
            getSanitizedFiltersWithoutPage(activeFilters)
          )) && (
          <ButtonTransparent onClick={onClearAll}>
            <TextBody
              color="night-l-100"
              css={css`
                margin-right: ${size(1)};
              `}
            >
              {t('clear_all')}
            </TextBody>
            <IconTrash color={color('night-l-100')} />
          </ButtonTransparent>
        )}
      </Flex>
    </SWrapper>
  )
}
