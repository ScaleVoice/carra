import { FormProvider, useForm } from "react-hook-form"

export const DashboardContent = () => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <div className="h-screen flex-grow bg-gradient-to-r from-gray-900 to-primary p-6"></div>
    </FormProvider>
  )
}
