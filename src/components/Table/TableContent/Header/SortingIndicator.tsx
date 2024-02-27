import { Icon } from "@/components/Icons"
import { SortDirection } from "@tanstack/react-table"

type Props = {
  sorting: SortDirection | null
}

const SortingIndicator = ({ sorting }: Props) => {
  if (!sorting) {
    return <div className="h-4 w-4" /> // prevents layout shift
  }

  return <Icon name={sorting === "asc" ? "ArrowUp" : "ArrowDown"} className="[&_path]:stroke-gray-400" size="1rem" />
}

export default SortingIndicator
