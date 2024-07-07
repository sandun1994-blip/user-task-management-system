"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  title: string;
  label: string;
  items: { value: string; label: string }[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
};

export function SelectBox({
  title,
  label,
  items,
  selectedValue,
  setSelectedValue,
}: Props) {
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[150px] outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem value={item.value} key={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
