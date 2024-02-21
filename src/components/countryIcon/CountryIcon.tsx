export type CountryIconId =
  | 'us'
  | 'de'
  | 'nl'
  | 'be'
  | 'at'
  | 'cz'
  | 'fr'
  | 'it'
  | 'pl'
  | 'es'
  | 'eu'

type Props = {
  countryId?: CountryIconId
  className?: string
}

export function CountryIcon({ countryId, className }: Props) {
  const iconName = () => {
    switch (countryId) {
      case 'us':
        return 'FlagUs.svg'
      case 'de':
        return 'FlagDe.svg'
      case 'nl':
        return 'FlagNl.svg'
      case 'be':
        return 'FlagBe.svg'
      case 'at':
        return 'FlagAt.svg'
      case 'cz':
        return 'FlagCz.svg'
      case 'fr':
        return 'FlagFr.svg'
      case 'it':
        return 'FlagIt.svg'
      case 'pl':
        return 'FlagPl.svg'
      case 'es':
        return 'FlagEs.svg'
      case 'eu':
        return 'FlagEu.svg'
      default:
        return null
    }
  }

  return (
    <img
      src={`/images/countries/${iconName()}`}
      className={className}
      alt={countryId}
    />
  )
}
