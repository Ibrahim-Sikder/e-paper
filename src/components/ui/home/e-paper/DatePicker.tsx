/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  currentDate?: string;
  availableDates: string[];
  onDateChange?: (date: string) => void;
}

export function DatePicker({
  currentDate,
  availableDates,
  onDateChange,
}: DatePickerProps) {
  const selectedDate = currentDate
    ? new Date(currentDate + "T00:00:00")
    : undefined;

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDates.includes(dateStr);
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  const isDateDisabled = (date: Date) => {
    return isFutureDate(date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onDateChange && !isFutureDate(date)) {
      onDateChange(format(date, "yyyy-MM-dd"));
    }
  };

  const pill =
    "inline-flex items-center gap-1.5 px-3 py-[7px] rounded-sm border border-gray-200 bg-white text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all select-none cursor-pointer whitespace-nowrap";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`${pill} flex-shrink-0`}>
          <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
          <span>
            {currentDate
              ? format(new Date(currentDate + "T00:00:00"), "dd-MM-yyyy")
              : "তারিখ নির্বাচন"}
          </span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 z-[9999] rounded-md shadow-2xl border border-gray-100 overflow-hidden"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-2xl"
          modifiers={{
            available: (date) => isDateAvailable(date),
            future: (date) => isFutureDate(date),
          }}
          modifiersClassNames={{
            available: "bg-green-100 text-green-700 font-medium rounded-sm",
            future:
              "bg-gray-100 text-gray-400 line-through cursor-not-allowed opacity-50",
          }}
          disabled={(date) => isDateDisabled(date)}
          initialFocus
        />
        <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#1A73E8] rounded-sm" />
            <span className="text-gray-500">নির্বাচিত</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-100 border border-green-300 rounded-full" />
            <span className="text-gray-500">উপলব্ধ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-gray-100 border border-gray-200 rounded-full" />
            <span className="text-gray-400">ভবিষ্যৎ</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
