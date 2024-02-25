import { Icon } from "@/components/Icons"
import { Listbox } from "@headlessui/react"
import { twMerge } from "tailwind-merge"

export const Select = ({ value, onChange, options, placeholder }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="flex flex-col">
          <Listbox.Button
            className={twMerge(
              "flex items-center gap-1 rounded-md border border-gray-50 px-4 py-2.5 font-bold text-gray-400",
              open && "rounded-b-none",
              value && "text-primary",
            )}
          >
            {value ? value.name : placeholder}

            <Icon name="IconChevronDown" className="ml-2 h-4 w-4" />
          </Listbox.Button>

          <div className="relative">
            <Listbox.Options
              className={twMerge(
                "absolute top-0 w-full rounded-md border border-gray-50 bg-white",
                open && "rounded-t-none border-t-0",
              )}
            >
              {options.map((person) => (
                <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
                  {({ active, selected }) => (
                    <li
                      className={twMerge(
                        "cursor-pointer border-b border-gray-50 px-4 py-2.5",
                        active && "bg-primary-25 text-primary",
                        selected && "bg-primary-50  text-primary",
                      )}
                    >
                      {person.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </div>
      )}
    </Listbox>
  )
}
