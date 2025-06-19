"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "cienfuegos",
    label: "Cienfuegos",
  },
  {
    value: "palmira",
    label: "Palmira",
  },
  {
    value: "rodas",
    label: "Rodas",
  },
  {
    value: "abreus",
    label: "Abreus",
  },
  {
    value: "aguada-de-pasajeros",
    label: "Aguada de Pasajeros",
  },
  {
    value: "cruces",
    label: "Cruces",
  },
  {
    value: "lajas",
    label: "Lajas",
  },
  {
    value: "cumanayagua",
    label: "Cumanayagua",
  },
]

export function TownsCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:scale-101 transition shadow-md cursor-pointer hover:bg-white"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Seleccionar Municipio"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={4}
      >
        <Command className="w-full">
          <CommandInput placeholder="Buscar municipio..." />
          <CommandList>
            <CommandEmpty>Este Municipio no se encuentra.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}