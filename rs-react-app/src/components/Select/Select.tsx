import { memo, } from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  label?: string;
}

const Select = memo(({ value, onChange, options, label }: SelectProps) => {
  console.log('Select rendered with value:', value);

  return (
    <div className="flex items-center">
      {label && <span className="mr-2 text-sm">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;