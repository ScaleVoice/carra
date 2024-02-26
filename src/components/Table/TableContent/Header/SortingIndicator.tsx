import { Icon } from "@/components/Icons"
import { SortDirection } from "@tanstack/react-table"

type Props = {
  sorting: SortDirection | null
}

const SortingIndicator = ({ sorting }: Props) => {
  if (!sorting) {
    return null
  }

  return (
    <Icon
      name={sorting === "asc" ? "ArrowUp" : "ArrowDown"}
      className={sorting ? "[&_path]:stroke-gray-100" : "[&_path]:stroke-gray-400"}
      size="1rem"
    />
  )
}

export default SortingIndicator
