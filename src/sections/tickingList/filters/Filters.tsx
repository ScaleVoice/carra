import { FC } from "react"
import { BodyFilter } from "./BodyFilter"
import { DateFilter } from "./DateFilter"
import { MakeFilter } from "./MakeFilter"
import { MileageFilter } from "./MileageFilter"
import { ModelFilter } from "./ModelFilter"
import { TransmissionFilter } from "./TransmissionFilter"
import { YearFilter } from "./YearFilter"

type Props = {}

export const Filters: FC<Props> = () => {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <MakeFilter />

      <ModelFilter />

      <BodyFilter />

      <TransmissionFilter />

      <YearFilter />

      <MileageFilter />

      <DateFilter />
    </div>
  )
}
