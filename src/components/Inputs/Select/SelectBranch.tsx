import { useBranchOptions, useBranchSearch } from "@/api/useBranch"
import { FC } from "react"
import { Menu } from "../Menu/Menu"
import { Option } from "../types"

type Props = {
  value: Option['value']
  onChange: (value: Option['value']) => void
  placeholder?: string
  name: string
}

export const SelectBranch: FC<Props> = ({ placeholder, ...props }) => {
  const { data } = useBranchSearch()
  const options = useBranchOptions(data ?? [])

  return <Menu placeholder={placeholder || "Select branch"} options={options} {...props} />
}
