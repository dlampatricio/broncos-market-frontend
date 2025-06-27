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
    price: formatPrice(10),
  },
  {
    value: "rodas",
    label: "Rodas",
    price: formatPrice(30),
  },
  {
    value: "abreus",
    label: "Abreus",
    price: formatPrice(20),
  },
  {
    value: "aguada-de-pasajeros",
    label: "Aguada de Pasajeros",
    price: formatPrice(30)
  },
  {
    value: "cruces",
    label: "Cruces",
    price: formatPrice(50),
  },
  {
    value: "lajas",
    label: "Lajas",
    price: formatPrice(40),
  },
  {
    value: "cumanayagua",
    label: "Cumanayagua",
    price: formatPrice(50),
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
          className="w-full justify-between cursor-pointer hover:bg-white"
        >
          {selectedTown
            ? towns.find((town) => town.value === selectedTown)?.label
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
              {towns.map((town) => (
                <CommandItem
                  key={town.value}
                  value={town.value}
                  onSelect={(currentValue) => {
                    onTownSelect(currentValue === selectedTown ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="flex justify-between"
                >
                  <div className="flex items-center ">
                    {town.label}
                  </div>
                  <span className="text-muted-foreground">
                    {town.price}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}