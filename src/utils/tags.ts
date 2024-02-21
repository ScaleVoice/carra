export enum CarTag {
  FastSelling = 'FastSelling',
  NewArrival = 'NewArrival',
  UniqueConfiguration = 'UniqueConfiguration',
  Unicorn = 'Unicorn',
  ExpressDelivery = 'ExpressDelivery'
}

export type TagVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'warning-secondary'
  | 'majesty'
  | 'sale'
  | 'dark'

export const tagVariant = (tag: CarTag): TagVariant => {
  switch (tag) {
    case CarTag.FastSelling:
    case CarTag.UniqueConfiguration:
      return 'secondary'
    case CarTag.Unicorn:
      return 'majesty'
    default:
      return 'tertiary'
  }
}
