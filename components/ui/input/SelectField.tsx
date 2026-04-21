"use client";

interface Option {
    value: string | number
    label:string
}

interface SelectFieldProps {
    label:string;
    name:string;
    value: string | number 
    onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void 
    options: Option[]
}

export default function SelectField({
    label, 
    name,
    value,
    onChange,
    options,
}: SelectFieldProps) {
    return (
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 mb-1">
                {label}
            </label>
            <select name={name} value={value ?? ""} onChange={onChange} className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-non focus:ring-1 focus:ring-red-500 focus:border-red-500">
                <option value="">
                    Seleccione {label.toLowerCase()}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    )
}