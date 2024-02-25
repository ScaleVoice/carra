import { useState } from "react"
import { Select } from "./Select"

const options = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: false },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
]

export const SelectBranch = () => {
  const [value, setValue] = useState()

  return <Select value={value} onChange={setValue} options={options} placeholder="Select branch" />
}
