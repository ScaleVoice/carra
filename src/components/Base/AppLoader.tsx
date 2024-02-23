import { LoadingSpinner } from "rtu-components"
import { ScreenContainer } from "../Container/ScreenContainer"

export const AppLoader = () => {
  return (
    <ScreenContainer className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner color="black" className="h-10 w-10" />
    </ScreenContainer>
  )
}
