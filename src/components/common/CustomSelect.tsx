import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CustomSelect = ({ options, value, onChange, className }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative w-full lg:w-48", className)} ref={dropdownRef}>
      {/* Nút bấm hiển thị */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl text-[13px] font-bold transition-all border border-transparent focus:border-blue-200 outline-none cursor-pointer"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown 
          size={16} 
          className={cn("transition-transform duration-300 text-slate-400", isOpen && "rotate-180")} 
        />
      </button>

      {/* Menu Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-[1.5rem] shadow-xl shadow-slate-200/50 py-2 animate-in fade-in zoom-in duration-200 origin-top">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "px-5 py-2.5 mx-2 rounded-xl text-[13px] font-bold cursor-pointer transition-colors",
                value === option.value
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};