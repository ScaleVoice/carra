import { BodyTypeFilter } from 'components/filters/body/BodyFilter'
import { DownloadedAtFilter } from 'components/filters/downloadedAt/DownloadedAtFilter'
import { GradesFilter } from 'components/filters/grade/GradeFilter'
import { MakeFilter } from 'components/filters/make/MakeFilter'
import { MileageFilter } from 'components/filters/mileage/MileageFilter'
import { ModelFilter } from 'components/filters/model/ModelFilter'
import { TransmissionFilter } from 'components/filters/transmission/TransmissionFilter'
import { YearFilter } from 'components/filters/year/YearFilter'
import { useModelList } from 'core/api/lov/lovModelsSearch'
import { addHours } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useFiltersContext } from 'sections/filtering/reducer/FiltersContext'
import { Chip } from '../../../components/chip/Chip'
import { useTransmissionList } from '../../../core/api/lov/lovTransmissions'
import { RankFilter } from 'components/filters/rank/RankFilter'
import { ProfitFilter } from 'components/filters/profit/ProfitFilter'
import { ServerFilter } from 'components/filters/serverId/ServerFilter'
import { PrivateFilter } from 'components/filters/private/PrivateFilter'

export function useCallCustomerFilters() {
  const { t } = useTranslation()

  const {
    state: { callCustomer },
    dispatch
  } = useFiltersContext()

  const { models } = useModelList()

  const onSearch = useCallback(
    (fullText: string | undefined) => {
      dispatch({
        type: 'SET_MODULE_FILTERS',
        payload: {
          module: 'callCustomer',
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
        module: 'callCustomer'
      }
    })
  }

  const clear = useCallback(() => {
    dispatch({
      type: 'RESET_MODULE_FILTERS',
      payload: {
        module: 'callCustomer'
      }
    })
  }, [dispatch])

  const filters = [
    {
      Component: (
        <MakeFilter
          label={t('filters_make')}
          selectedMakeIds={callCustomer.filters.makeIds}
          onMakesChange={makeIds => {
            const activeModelOptions = models.filter(({ id }) =>
              callCustomer.filters.modelIds?.includes(id)
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
                module: 'callCustomer',
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
          selectedCarMakeIds={callCustomer.filters.makeIds}
          selectedModelIds={callCustomer.filters.modelIds}
          onModelsChange={modelIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
                filters: {
                  page: 1,
                  modelIds: modelIds.length > 0 ? modelIds : undefined
                }
              }
            })
          }}
        />
      ),
      disabled: !callCustomer.filters.makeIds?.length,
      disableHint: t('filters_model_tooltip')
    },
    {
      Component: (
        <BodyTypeFilter
          label={t('filters_body')}
          selectedMakeIds={callCustomer.filters.makeIds}
          selectedModelIds={callCustomer.filters.modelIds}
          selectedBodyIds={callCustomer.filters.bodyIds}
          onBodyChange={bodyIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
        <DownloadedAtFilter
          from={callCustomer.filters.downloadedAtFrom}
          to={callCustomer.filters.downloadedAtTo}
          onLastHourClick={() => {
            const currentTime = new Date()

            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
                module: 'callCustomer',
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
                module: 'callCustomer',
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
        <GradesFilter
          label={t('filters_grade')}
          selectedGrades={callCustomer.filters.carGrades}
          onGradesChange={carGrades => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
        <YearFilter
          label={t('filters_year')}
          yearFrom={callCustomer.filters.yearOfMakeFrom}
          yearTo={callCustomer.filters.yearOfMakeTo}
          onYearChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
        callCustomer.filters.yearOfMakeFrom ||
        callCustomer.filters.yearOfMakeTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'callCustomer',
                  filters: {
                    yearOfMakeFrom: undefined,
                    yearOfMakeTo: undefined
                  }
                }
              })
            }}
          >
            {[
              callCustomer.filters.yearOfMakeFrom,
              callCustomer.filters.yearOfMakeTo
            ].join(' - ')}
          </Chip>
        ) : null
    },
    {
      Component: (
        <MileageFilter
          label={t('filters_mileage')}
          mileageFrom={callCustomer.filters.speedometerMileageKmFrom}
          mileageTo={callCustomer.filters.speedometerMileageKmTo}
          onMileageChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
        callCustomer.filters.speedometerMileageKmFrom ||
        callCustomer.filters.speedometerMileageKmTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'callCustomer',
                  filters: {
                    speedometerMileageKmFrom: undefined,
                    speedometerMileageKmTo: undefined
                  }
                }
              })
            }}
          >
            {t('km_range', {
              from: callCustomer.filters.speedometerMileageKmFrom,
              to: callCustomer.filters.speedometerMileageKmTo
            })}
          </Chip>
        ) : null
    },
    {
      Component: (
        <TransmissionFilter
          label={t('filters_transmission')}
          selectedTransmissionId={callCustomer.filters.transmissionIds?.[0]}
          onTransmissionsChange={id => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
                filters: {
                  page: 1,
                  transmissionIds: id ? [id] : undefined
                }
              }
            })
          }}
        />
      ),
      value: callCustomer.filters.transmissionIds ? (
        <>
          {callCustomer.filters.transmissionIds.map(transmissionId => {
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
                      module: 'callCustomer',
                      filters: {
                        transmissionIds:
                          callCustomer.filters.transmissionIds?.filter(
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
          rankFrom={callCustomer.filters.rankFrom}
          rankTo={callCustomer.filters.rankTo}
          onRankChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
          profitFrom={callCustomer.filters.profitFrom}
          profitTo={callCustomer.filters.profitTo}
          onProfitChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
          selected={callCustomer.filters.sellerTypes?.[0]}
          onChange={seller =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
          selectedServers={callCustomer.filters.serverIds}
          onServersChange={serverIds =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'callCustomer',
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
    defaultSearch: callCustomer.filters.fullText,
    onSearch,
    clear,
    openedFilters: callCustomer.openedFilterMenu,
    toggleOpenFilters: toggleFiltersMenu,
    activeFilters: callCustomer.filters
  }
}
