"use client";

export interface Option {
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
            <select name={name} value={value ?? ""} onChange={onChange} 
            className="w-full border px-2 py-1 text-sm whitespace-normal focus:ring-1 focus:ring-red-500 focus:border-red-500">
                <option value="">
                    Seleccione {label.toLowerCase()}
                </option>
                {options.map((option,index) => (
                    <option key={option.value ?? index} value={option.value}>
                        {option.label ?? "Sin nombre"}
                    </option>
                ))}
            </select>
        </div>
    )
}