import { FC } from "react"
import { Button } from "rtu-components"
import { Icon } from "../Icons"

interface Props {
  label: string
  onAdd: () => void
}

export const AddButton: FC<Props> = ({ label, onAdd }) => {
  return (
    <Button intent="custom" onClick={onAdd} className="h-8 justify-start p-0 text-gray">
      <Icon name="Plus" />
      <span>{label}</span>
    </Button>
  )
}
