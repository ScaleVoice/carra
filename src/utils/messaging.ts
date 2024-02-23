type Method = "GET" | "POST" | "PUT" | "DELETE" | "FIREBASE"

export function logErrorMessage(method: Method, route: string, message: string) {
  console.error(`Error => ${method}: ${route}`, message)
}

export function logSuccessMessage(method: Method, route: string, message: string) {
  console.log(`Success => ${method}: ${route}`, message)
}

export function logFirebaseError(functionName: string, message: string) {
  console.error(`Firebase => ${functionName}`, message)
}
