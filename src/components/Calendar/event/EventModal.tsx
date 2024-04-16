import { useBranchDetail } from "@/api/useBranch"
import { useCarDetail } from "@/api/useCarDetail"
import { useEmployeeDetail } from "@/api/useEmployeeSearch"
import { Modal, ModalProps } from "@/components/Base/Modal"
import { Button } from "@/components/Buttons/Button"
import { ButtonRound } from "@/components/Buttons/ButtonRound"
import { Icon } from "@/components/Icons"
import { addHours } from "date-fns"
import { FC, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useCalendarContext } from "../CalendarProvider"
import { ChipCategory } from "../ChipCategory"
import { CustomRBEvent } from "../types"
import { EventModalForm } from "./EventModalForm"
import { EventModalView } from "./EventModalView"
import { useTranslation } from "react-i18next"

type Props = Omit<ModalProps, "children"> & { editing?: boolean; event: CustomRBEvent | null }

export enum EventModalKeys {
  TITLE = "title",
  START = "start",
  END = "end",
  CAR = "car",
  BRANCH = "branch",
  EMPLOYEE = "employee",
}

export type EventModalFormData = {
  [EventModalKeys.TITLE]: string
  [EventModalKeys.START]: Date
  [EventModalKeys.END]: Date
  [EventModalKeys.CAR]: string
  [EventModalKeys.BRANCH]: string
  [EventModalKeys.EMPLOYEE]: number
}

export const EventModal: FC<Props> = ({ event, isOpen, onClose, editing = false }) => {
  const { t } = useTranslation()
  const form = useForm<EventModalFormData>({
    defaultValues: {
      title: event?.title ?? "",
      start: event?.start ?? new Date(),
      end: event?.end ?? addHours(new Date(), 0.5),
      car: event?.car?.id,
      branch: event?.branch?.id,
      employee: event?.employee?.value,
    },
  })
  const [isEditing, setIsEditing] = useState(editing)
  const { updateEvent, addEvent } = useCalendarContext()

  const carDetail = useCarDetail(form.watch(EventModalKeys.CAR))
  const branchDetail = useBranchDetail(form.watch(EventModalKeys.BRANCH) ?? "")
  const employeeDetail = useEmployeeDetail(form.watch(EventModalKeys.EMPLOYEE))

  const toggleEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const onSubmit = (data: EventModalFormData) => {
    console.log(data)

    if (event?.meta?.isNew) {
      addEvent({
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        type: event.type,
        car: carDetail,
        branch: branchDetail,
        employee: employeeDetail,
      })
    } else {
      updateEvent({
        id: event?.id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        car: carDetail,
        branch: branchDetail,
        employee: employeeDetail,
      })
    }

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[450px] gap-6 bg-white p-6 md:p-6">
      <FormProvider {...form}>
        <div className="flex w-full items-center justify-between">
          <ChipCategory eventType={event?.type} />

          <div className="flex justify-end gap-4">
            <ButtonRound size="tiny" onClick={toggleEditing}>
              <Icon name="Edit05" />
            </ButtonRound>

            <ButtonRound size="tiny" onClick={onClose}>
              <Icon name="IconClose" />
            </ButtonRound>
          </div>
        </div>

        {isEditing ? (
          <EventModalForm />
        ) : (
          <EventModalView carDetail={carDetail} employeeDetail={employeeDetail} branchDetail={branchDetail} />
        )}

        {isEditing && (
          <Button onClick={form.handleSubmit(onSubmit)} className="mt-4 w-full">
            {t("save")}
          </Button>
        )}
      </FormProvider>
    </Modal>
  )
}
