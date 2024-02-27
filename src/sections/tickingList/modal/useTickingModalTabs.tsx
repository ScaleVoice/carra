import { useState } from "react"

const options = [
  { label: "Car", value: "car" },
  { label: "Customer", value: "customer" },
  { label: "Pricing", value: "pricing" },
]

export const useTickingModalTabs = () => {
  const [activeTab, setActiveTab] = useState("car")

  return {
    activeTab,
    setActiveTab,
    options,
  }
}
