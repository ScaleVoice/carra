import { BodyTypeFilter } from 'components/filters/body/BodyFilter'
import { DownloadedAtFilter } from 'components/filters/downloadedAt/DownloadedAtFilter'
import { GradesFilter } from 'components/filters/grade/GradeFilter'
import { MakeFilter } from 'components/filters/make/MakeFilter'
import { MileageFilter } from 'components/filters/mileage/MileageFilter'
import { ModelFilter } from 'components/filters/model/ModelFilter'
import { ReactionFilter } from 'components/filters/reaction/ReactionFilter'
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

export function useHistoryFilters() {
  const { t } = useTranslation()

  const {
    state: { history },
    dispatch
  } = useFiltersContext()

  const { models } = useModelList()

  const onSearch = useCallback(
    (fullText: string | undefined) => {
      dispatch({
        type: 'SET_MODULE_FILTERS',
        payload: {
          module: 'history',
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
        module: 'history'
      }
    })
  }

  const clear = useCallback(() => {
    dispatch({
      type: 'RESET_MODULE_FILTERS',
      payload: {
        module: 'history'
      }
    })
  }, [dispatch])

  const filters = [
    {
      Component: (
        <MakeFilter
          label={t('filters_make')}
          selectedMakeIds={history.filters.makeIds}
          onMakesChange={makeIds => {
            const activeModelOptions = models.filter(({ id }) =>
              history.filters.modelIds?.includes(id)
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
                module: 'history',
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
          selectedCarMakeIds={history.filters.makeIds}
          selectedModelIds={history.filters.modelIds}
          onModelsChange={modelIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
                filters: {
                  page: 1,
                  modelIds: modelIds.length > 0 ? modelIds : undefined
                }
              }
            })
          }}
        />
      ),
      disabled: !history.filters.makeIds?.length,
      disableHint: t('filters_model_tooltip')
    },
    {
      Component: (
        <BodyTypeFilter
          label={t('filters_body')}
          selectedMakeIds={history.filters.makeIds}
          selectedModelIds={history.filters.modelIds}
          selectedBodyIds={history.filters.bodyIds}
          onBodyChange={bodyIds => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
          selectedGrades={history.filters.carGrades}
          onGradesChange={carGrades => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
          from={history.filters.downloadedAtFrom}
          to={history.filters.downloadedAtTo}
          onLastHourClick={() => {
            const currentTime = new Date()

            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
                module: 'history',
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
                module: 'history',
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
        <ReactionFilter
          label="Reaction"
          selectedStates={history.filters.stateActions}
          onStatesChange={stateActions =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
                filters: {
                  page: 1,
                  stateActions
                }
              }
            })
          }
        />
      )
    },
    {
      Component: (
        <YearFilter
          label={t('filters_year')}
          yearFrom={history.filters.yearOfMakeFrom}
          yearTo={history.filters.yearOfMakeTo}
          onYearChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
        history.filters.yearOfMakeFrom || history.filters.yearOfMakeTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'history',
                  filters: {
                    yearOfMakeFrom: undefined,
                    yearOfMakeTo: undefined
                  }
                }
              })
            }}
          >
            {[
              history.filters.yearOfMakeFrom,
              history.filters.yearOfMakeTo
            ].join(' - ')}
          </Chip>
        ) : null
    },
    {
      Component: (
        <MileageFilter
          label={t('filters_mileage')}
          mileageFrom={history.filters.speedometerMileageKmFrom}
          mileageTo={history.filters.speedometerMileageKmTo}
          onMileageChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
        history.filters.speedometerMileageKmFrom ||
        history.filters.speedometerMileageKmTo ? (
          <Chip
            onRemove={() => {
              dispatch({
                type: 'SET_MODULE_FILTERS',
                payload: {
                  module: 'history',
                  filters: {
                    speedometerMileageKmFrom: undefined,
                    speedometerMileageKmTo: undefined
                  }
                }
              })
            }}
          >
            {t('km_range', {
              from: history.filters.speedometerMileageKmFrom,
              to: history.filters.speedometerMileageKmTo
            })}
          </Chip>
        ) : null
    },
    {
      Component: (
        <TransmissionFilter
          label={t('filters_transmission')}
          selectedTransmissionId={history.filters.transmissionIds?.[0]}
          onTransmissionsChange={id => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
                filters: {
                  page: 1,
                  transmissionIds: id ? [id] : undefined
                }
              }
            })
          }}
        />
      ),
      value: history.filters.transmissionIds ? (
        <>
          {history.filters.transmissionIds.map(transmissionId => {
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
                      module: 'history',
                      filters: {
                        transmissionIds:
                          history.filters.transmissionIds?.filter(
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
          rankFrom={history.filters.rankFrom}
          rankTo={history.filters.rankTo}
          onRankChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
          profitFrom={history.filters.profitFrom}
          profitTo={history.filters.profitTo}
          onProfitChange={(from, to) => {
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
          selected={history.filters.sellerTypes?.[0]}
          onChange={seller =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
          selectedServers={history.filters.serverIds}
          onServersChange={serverIds =>
            dispatch({
              type: 'SET_MODULE_FILTERS',
              payload: {
                module: 'history',
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
    defaultSearch: history.filters.fullText,
    onSearch,
    clear,
    openedFilters: history.openedFilterMenu,
    toggleOpenFilters: toggleFiltersMenu,
    activeFilters: history.filters
  }
}
