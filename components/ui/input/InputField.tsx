interface Props {
    label:string;
    name:string;
    value:string | number;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void 
    type?: string
} 
export default function InputField({
    label,
    name,
    value,
    onChange,
    type="text"
}: Props) {
    return (
    <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-700 mb-1">
            {label}
        </label>
        <input type={type} onChange={onChange} name={name} value={value ?? ""} className="w-full border border-gray-400 px-3 py-2 text-sm bg-white focus:outline focus:ring-1 focus:ring-red-500 focus:border-red-500" />
    </div>
    )
}