import { BodyTypeFilter } from 'components/filters/body/BodyFilter'
import { DownloadedAtFilter } from 'components/filters/downloadedAt/DownloadedAtFilter'
import { GradesFilter } from 'components/filters/grade/GradeFilter'
import { MakeFilter } from 'components/filters/make/MakeFilter'
import { MileageFilter } from 'components/filters/mileage/MileageFilter'
import { ModelFilter } from 'components/filters/model/ModelFilter'
import { ProfitFilter } from 'components/filters/profit/ProfitFilter'
import { RankFilter } from 'components/filters/rank/RankFilter'
import { ServerFilter } from 'components/filters/serverId/ServerFilter'
import { TransmissionFilter } from 'components/filters/transmission/TransmissionFilter'
import { YearFilter } from 'components/filters/year/YearFilter'
import { useModelList } from 'core/api/lov/lovModelsSearch'
import { addHours } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { Chip } from '../../../components/chip/Chip'
import { useTransmissionList } from '../../../core/api/lov/lovTransmissions'
import { PrivateFilter } from 'components/filters/private/PrivateFilter'

export function useTickingListFilters() {
  const { t } = useTranslation()

  const {
    state: { tickingList },
    dispatch
  } = useFiltersContext()

  const { models } = useModelList()

  const onSearch = useCallback(
    (fullText: string | undefined) => {
      dispatch({
        type: 'SET_MODULE_FILTERS',
        payload: {
          module: 'tickingList',
          filters: {
            fullText,
            page: 1
          }
        }
      })
    },
    [dispatch]
  )

  const { transmissions } = useTransmissionList()

  const toggleFiltersMenu = () => {
    dispatch({
      type: 'TOGGLE_MODULE_FILTERS',
      payload: {
        module: 'tickingList'
      }
    })
  }

  const clear = useCallback(() => {
    dispatch({
      type: 'RESET_MODULE_FILTERS',
      payload: {
        module: 'tickingList'
      }
    })
  }, [dispatch])

  const filters = [
    {
      Component: (
        <MakeFilter
          label={t('filters_make')}
          selectedMakeIds={tickingList.filters.makeIds}
          onMakesChange={makeIds => {
            const activeModelOptions = models.filter(({ id }) =>
              tickingList.filters.modelIds?.includes(id)
            )

            // filter out irrelevant models (when the make is no longer picked)
            const newModelIdsByActiveCarMakes = activeModelOptions.reduce<
              string[]
            >((acc, curr) => {
              if (curr.makeId && makeIds?.includes(curr.makeId)) {
                return [...acc, curr.id]
              }

              return acc
            }, [])

            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  makeIds: !!makeIds.length ? makeIds : undefined,
                  modelIds:
                    newModelIdsByActiveCarMakes.length > 0
                      ? newModelIdsByActiveCarMakes
                      : undefined
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <ModelFilter
          label="Model"
          selectedCarMakeIds={tickingList.filters.makeIds}
          selectedModelIds={tickingList.filters.modelIds}
          onModelsChange={modelIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  modelIds: modelIds.length > 0 ? modelIds : undefined
                }
              }
            })
          }}
        />
      ),
      disabled: !tickingList.filters.makeIds?.length,
      disableHint: t('filters_model_tooltip')
    },
    {
      Component: (
        <BodyTypeFilter
          label={t('filters_body')}
          selectedMakeIds={tickingList.filters.makeIds}
          selectedModelIds={tickingList.filters.modelIds}
          selectedBodyIds={tickingList.filters.bodyIds}
          onBodyChange={bodyIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  bodyIds: bodyIds.length > 0 ? bodyIds : undefined
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <GradesFilter
          label={t('filters_grade')}
          selectedGrades={tickingList.filters.carGrades}
          onGradesChange={carGrades => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  carGrades
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <DownloadedAtFilter
          from={tickingList.filters.downloadedAtFrom}
          to={tickingList.filters.downloadedAtTo}
          onLastHourClick={() => {
            const currentTime = new Date()

            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  downloadedAtFrom: addHours(currentTime, -1).toISOString(),
                  downloadedAtTo: currentTime.toISOString()
                }
              }
            })
          }}
          onFromChange={from => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  downloadedAtFrom: from
                    ? new Date(from).toISOString()
                    : undefined
                }
              }
            })
          }}
          onToChange={to => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  downloadedAtTo: to ? new Date(to).toISOString() : undefined
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <YearFilter
          label={t('filters_year')}
          yearFrom={tickingList.filters.yearOfMakeFrom}
          yearTo={tickingList.filters.yearOfMakeTo}
          onYearChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  yearOfMakeFrom: from ? from : undefined,
                  yearOfMakeTo: to ? to : undefined
                }
              }
            })
          }}
        />
      ),
      value:
        tickingList.filters.yearOfMakeFrom ||
        tickingList.filters.yearOfMakeTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'tickingList',
                  filters: {
                    page: 1,
                    yearOfMakeFrom: undefined,
                    yearOfMakeTo: undefined
                  }
                }
              })
            }}
          >
            {[
              tickingList.filters.yearOfMakeFrom,
              tickingList.filters.yearOfMakeTo
            ].join(' - ')}
          </Chip>
        ) : null
    },
    {
      Component: (
        <MileageFilter
          label={t('filters_mileage')}
          mileageFrom={tickingList.filters.speedometerMileageKmFrom}
          mileageTo={tickingList.filters.speedometerMileageKmTo}
          onMileageChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  speedometerMileageKmFrom: from ? from : undefined,
                  speedometerMileageKmTo: to ? to : undefined
                }
              }
            })
          }}
        />
      ),
      value:
        tickingList.filters.speedometerMileageKmFrom ||
        tickingList.filters.speedometerMileageKmTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'tickingList',
                  filters: {
                    page: 1,
                    speedometerMileageKmFrom: undefined,
                    speedometerMileageKmTo: undefined
                  }
                }
              })
            }}
          >
            {t('km_range', {
              from: tickingList.filters.speedometerMileageKmFrom,
              to: tickingList.filters.speedometerMileageKmTo
            })}
          </Chip>
        ) : null
    },
    {
      Component: (
        <TransmissionFilter
          label={t('filters_transmission')}
          selectedTransmissionId={tickingList.filters.transmissionIds?.[0]}
          onTransmissionsChange={id => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  transmissionIds: id ? [id] : undefined
                }
              }
            })
          }}
        />
      ),
      value: tickingList.filters.transmissionIds ? (
        <>
          {tickingList.filters.transmissionIds.map(transmissionId => {
            const transmissionName = transmissions.find(
              id => id.value === transmissionId
            )?.label

            return (
              <Chip
                key={transmissionId}
                onRemove={() => {
                  dispatch({
                    type: 'SET_MODULE_FILTERS',
                    payload: {
                      module: 'tickingList',
                      filters: {
                        page: 1,
                        transmissionIds:
                          tickingList.filters.transmissionIds?.filter(
                            id => id !== transmissionId
                          )
                      }
                    }
                  })
                }}
              >
                {transmissionName}
              </Chip>
            )
          })}
        </>
      ) : null
    },
    {
      Component: (
        <RankFilter
          label={t('filters_rank')}
          rankFrom={tickingList.filters.rankFrom}
          rankTo={tickingList.filters.rankTo}
          onRankChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  rankFrom: from ? from : undefined,
                  rankTo: to ? to : undefined
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <ProfitFilter
          label={t('filters_profit')}
          profitFrom={tickingList.filters.profitFrom}
          profitTo={tickingList.filters.profitTo}
          onProfitChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  profitFrom: from ? from : undefined,
                  profitTo: to ? to : undefined
                }
              }
            })
          }}
        />
      )
    },
    {
      Component: (
        <PrivateFilter
          label={t('filters_private')}
          selected={tickingList.filters.sellerTypes?.[0]}
          onChange={seller =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  sellerTypes: seller ? [seller] : undefined
                }
              }
            })
          }
        />
      )
    },
    {
      Component: (
        <ServerFilter
          label={t('filters_server')}
          selectedServers={tickingList.filters.serverIds}
          onServersChange={serverIds =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'tickingList',
                filters: {
                  page: 1,
                  serverIds
                }
              }
            })
          }
        />
      )
    }
  ]

  return {
    filters,
    defaultSearch: tickingList.filters.fullText,
    onSearch,
    clear,
    openedFilters: tickingList.openedFilterMenu,
    toggleOpenFilters: toggleFiltersMenu,
    activeFilters: tickingList.filters
  }
}
