"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

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
import { formatPrice } from "@/lib/format-price"

interface TownsComboboxProps {
  selectedTown: string;
  onTownSelect: (town: string) => void;
}

const towns = [
  {
    value: "cienfuegos",
    label: "Cienfuegos",
    price: "Gratis",
  },
  {
    value: "palmira",
    label: "Palmira",
    price: formatPrice(5),
  },
  {
    value: "rodas",
    label: "Rodas",
    price: formatPrice(10),
  },
  {
    value: "abreus",
    label: "Abreus",
    price: formatPrice(10),
  },
  {
    value: "aguada-de-pasajeros",
    label: "Aguada de Pasajeros",
    price: formatPrice(18)
  },
  {
    value: "cruces",
    label: "Cruces",
    price: formatPrice(10),
  },
  {
    value: "lajas",
    label: "Lajas",
    price: formatPrice(14),
  },
  {
    value: "cumanayagua",
    label: "Cumanayagua",
    price: formatPrice(10),
  },
]

export function TownsCombobox({ selectedTown, onTownSelect }: TownsComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {selectedTown
            ? towns.find((town) => town.value === selectedTown)?.label
            : "Seleccionar Municipio"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar municipio..." />
          <CommandList>
            <CommandEmpty>Municipio no encontrado</CommandEmpty>
            <CommandGroup>
              {towns.map((town) => (
                <CommandItem
                  key={town.value}
                  value={town.value}
                  onSelect={(currentValue) => {
                    onTownSelect(currentValue === selectedTown ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="flex justify-between px-4 py-2"
                >
                  <span>{town.label}</span>
                  <span className="text-muted-foreground">{town.price}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}