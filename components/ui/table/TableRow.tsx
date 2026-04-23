interface Props {
  cells: React.ReactNode[];
}

export default function TableRow({ cells }: Props) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      {cells.map((cell, index) => (
        <td key={index} className="px-4 py-2">
          {cell}
        </td>
      ))}
    </tr>
  );
}
