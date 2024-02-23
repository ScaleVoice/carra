import { FirebaseSuccessMessages } from "@/components/Firebase/messages"
import { API_ROUTES } from "@/conf"
import { logErrorMessage, logSuccessMessage } from "@/utils/messaging"
import { getHeaders } from "./firebase"

export const register = async () => {
  const method = "POST"
  const headers = await getHeaders()

  try {
    await fetch(API_ROUTES.register, {
      method,
      headers,
    })

    logSuccessMessage(method, API_ROUTES.register, FirebaseSuccessMessages.registration)
  } catch (error) {
    // TODO: standardize error message
    logErrorMessage(method, API_ROUTES.register, error)
  }
}
