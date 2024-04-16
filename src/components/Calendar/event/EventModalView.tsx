import { Branch } from "@/api/useBranch"
import { TickingItem } from "@/api/useSearch"
import { Divider } from "@/components/Base/Divider"
import CopyButton from "@/components/Buttons/CopyButton"
import { Icon } from "@/components/Icons"
import { Text } from "@/components/Text"
import { formatDate } from "@/utils/date"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { EventModalFormData } from "./EventModal"
import { useTranslation } from "react-i18next"

function formatCarName(car?: TickingItem) {
  if (!car) return ""

  return `${car.makeId} ${car.modelId} · ${car.yearOfMake} · ${car.driveId}`
}

function formatBranchName(branch?: Branch) {
  if (!branch) return ""

  return `${branch.name}, ${branch.address}`
}

interface EventModalViewProps {
  carDetail?: TickingItem
  employeeDetail?: any
  branchDetail?: Branch
}

export const EventModalView: FC<EventModalViewProps> = ({ carDetail, employeeDetail, branchDetail }) => {
  const { t } = useTranslation("appointments")
  const { getValues } = useFormContext()
  const { title, start, end } = getValues() as EventModalFormData

  return (
    <>
      <div className="flex w-full flex-col justify-start my-3">
        <Text size="2xl" className="leading-6 text-black">
          {title}
        </Text>
        <Text className="text-gray-400">
          {formatDate(start, "HH:mm")} - {formatDate(end, "HH:mm")}
        </Text>
      </div>

      <div className="flex w-full flex-col justify-start gap-2">
        <div className="flex gap-2">
          <Icon name="Car" className="text-primary-300" />
          <Text size="sm" className="text-gray-400">
            {formatCarName(carDetail)}
          </Text>
        </div>
        <div className="flex gap-2">
          <Icon name="MarkerPin01" className="text-primary-300" />
          <Text size="sm" className="text-gray-400">
            {formatBranchName(branchDetail)}
          </Text>
        </div>
        <div className="flex gap-2">
          <Icon name="User01" className="text-primary-300" />
          <Text size="sm" className="text-gray-400">
            {employeeDetail?.name}
          </Text>
        </div>
      </div>

      <Divider />

      <div className="flex w-full flex-col justify-start gap-1">
        {carDetail?.driveId && (
          <div className="flex w-full items-center justify-between">
            <Text size="sm" className="text-gray-800">
              {t('events_form_vin')}
            </Text>
            <div className="flex items-center gap-1 text-primary">
              <CopyButton text={carDetail?.driveId} className="text-primary" />
            </div>
          </div>
        )}
        {carDetail?.adNo && (
          <div className="flex w-full items-center justify-between">
            <Text size="sm" className="text-gray-800">
            {t('events_form_stock_id')}
            </Text>
            <div className="flex items-center gap-1 text-primary">
              <CopyButton text={carDetail?.adNo} className="text-primary" />
            </div>
          </div>
        )}
        {carDetail?.serverId && (
          <div className="flex w-full items-center justify-between">
            <Text size="sm" className="text-gray-800">
            {t('events_form_erp_id')}
            </Text>
            <div className="flex items-center gap-1 text-primary">
              <CopyButton text={String(carDetail?.serverId)} className="text-primary" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
