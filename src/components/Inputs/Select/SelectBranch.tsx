import { useState } from "react"
import { Option, Select } from "./Select"

const options = [
  { value: 1, label: "Durward Reynolds", disabled: false },
  { value: 2, label: "Kenton Towne", disabled: false },
  { value: 3, label: "Therese Wunsch", disabled: false },
  { value: 4, label: "Benedict Kessler", disabled: false },
  { value: 5, label: "Katelyn Rohan", disabled: false },
]

export const SelectBranch = () => {
  const [value, setValue] = useState<Option | null>(null)

  return <Select value={value} onChange={setValue} options={options} placeholder="Select branch" />
}
