type Props = {
  makeId?: string
  className?: string
}

export function CarMakeIcon({ makeId, className }: Props) {
  const iconName = () => {
    switch (makeId) {
      case 'BMW':
        return 'IconBMW.svg'
      case 'FORD':
        return 'IconFord.svg'
      case 'TOYOTA':
        return 'IconToyota.svg'
      case 'KIA':
        return 'IconKia.svg'
      case 'OPEL':
        return 'IconOpel.svg'
      case 'NISSAN':
        return 'IconNissan.svg'
      case 'SKODA':
        return 'IconSkoda.svg'
      case 'RENAULT':
        return 'IconRenault.svg'
      case 'VW':
        return 'IconVolkswagen.svg'
      case 'SUZUKI':
        return 'IconSuzuki.svg'
      case 'ISUZU':
        return 'IconIsuzu.svg'
      case 'LANDROVER':
        return 'IconLandrover.svg'
      case 'SEAT':
        return 'IconSeat.svg'
      case 'PEUGEOT':
        return 'IconPeugeot.svg'
      case 'HYUNDAI':
        return 'IconHyundai.svg'
      case 'MERCEDES':
        return 'IconMercedes.svg'
      case 'FIAT':
        return 'IconFiat.svg'
      case 'AUDI':
        return 'IconAudi.svg'
      case 'MAZDA':
        return 'IconMazda.svg'
      case 'HONDA':
        return 'IconHonda.svg'
      default:
        return null
    }
  }

  return hasMakeIcon(makeId) ? (
    <img
      className={className}
      src={`/images/brands/${iconName()}`}
      alt={makeId}
    />
  ) : null
}

const makesWithIcons = [
  'BMW',
  'FORD',
  'TOYOTA',
  'KIA',
  'OPEL',
  'SKODA',
  'RENAULT',
  'VW',
  'SEAT',
  'PEUGEOT',
  'NISSAN',
  'SUZUKI',
  'ISUZU',
  'LANDROVER',
  'HONDA',
  'HYUNDAI',
  'MERCEDES',
  'FIAT',
  'AUDI',
  'MAZDA'
]

export function hasMakeIcon(makeId?: string) {
  return makeId && makesWithIcons.includes(makeId)
}
