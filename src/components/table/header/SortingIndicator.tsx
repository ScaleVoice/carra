import { Icon } from "@/components/Icons"
import { SortDirection } from "@tanstack/react-table"
import { FC } from "react"

type Props = {
  sorting: false | SortDirection
}

export const SortingIndicator: FC<Props> = ({ sorting }) => {
  if (!sorting) {
    return null
  }

  return <Icon name={sorting === "asc" ? "ArrowUp" : "ArrowDown"} />
}
