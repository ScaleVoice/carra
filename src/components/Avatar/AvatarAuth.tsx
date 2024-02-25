import { useUser } from "@clerk/nextjs"
import { FC, ReactNode } from "react"
import { Avatar } from "."

interface Props {
  withName?: boolean
  Button?: ReactNode
}

export const AvatarAuth: FC<Props> = ({ withName, Button }) => {
  const { user } = useUser()

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar url={user?.imageUrl ?? ""} fullName={user?.fullName} />
        {withName && <span className="text-gray">{user?.fullName}</span>}
      </div>
      {Button}
    </div>
  )
}
