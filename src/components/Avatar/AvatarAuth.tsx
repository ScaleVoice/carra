import { FC, ReactNode } from "react"
import { Avatar } from "."
import { useAuthContext } from "../Firebase/AuthProvider"

interface Props {
  withName?: boolean
  Button?: ReactNode
}

export const AvatarAuth: FC<Props> = ({ withName, Button }) => {
  const user = useAuthContext()

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar url={user.photoURL ?? ""} fullName={user.displayName} />
        {withName && <span className="text-gray">{user.displayName}</span>}
      </div>
      {Button}
    </div>
  )
}
