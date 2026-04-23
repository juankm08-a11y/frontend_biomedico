interface Props {
  headers: string[];
}

export default function TableHead({ headers }: Props) {
  return (
    <thead className="bg-gray-100 border-b border-gray-300">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="px-4 py-3 text-left font-semibold text-gray-700"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
