import TableRow from "./TableRow";

interface Props {
  rows?: React.ReactNode[][];
}

export default function TableBody({ rows }: Props) {
  return (
    <tbody>
      {(rows ?? []).map((row, index) => (
        <TableRow key={index} cells={row} />
      ))}
    </tbody>
  );
}
