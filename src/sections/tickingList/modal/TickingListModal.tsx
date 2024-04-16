import { Modal } from "@/components/Base/Modal"
import { Tabs } from "@/components/Base/Tabs"
import { ButtonRound } from "@/components/Buttons/ButtonRound"
import { Icon } from "@/components/Icons"
import { Text } from "@/components/Text"
import { FC } from "react"
import { Car } from "./Car"
import { Customer } from "./Customer"
import { Footer } from "./Footer"
import { Pricing } from "./Pricing"
import { useTickingModalTabs } from "./useTickingModalTabs"
import { TickingItem } from "@/api/useSearch"

type TickingListModalProps = {
  item: TickingItem | null
  onClose: () => void
}

export const TickingListModal: FC<TickingListModalProps> = ({ item, onClose }) => {
  const { options, activeTab, setActiveTab } = useTickingModalTabs()

  return (
    <Modal
      isOpen={item !== null}
      onClose={onClose}
      className="slide-in fixed right-0 h-full w-[780px] gap-3 rounded-none bg-white"
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <Text size="lg"> {item?.adNo}</Text>
          <Text size="sm" className="text-gray-400">
            {item?.updatedAt}
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <ButtonRound variant="outlined" onClick={onClose} className="p-2">
            <Icon name="IconClose" size="2rem" />
          </ButtonRound>
        </div>
      </div>

      <Tabs
        options={options}
        value={activeTab}
        onClick={setActiveTab}
        containerClassName="p-1 bg-gray-25 w-full"
        className="w-1/3 p-2"
      />

      {activeTab === "car" && <Car item={item} />}
      {activeTab === "customer" && <Customer seller={item?.seller} />}
      {activeTab === "pricing" && <Pricing item={item} />}

      <Footer />
    </Modal>
  )
}
