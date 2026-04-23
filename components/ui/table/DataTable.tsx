import Card from "../cards/Card";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

export default function DataTable<T>({ data, columns, title }: Props<T>) {
  const headers = columns.map((c) => c.label);

  const rows = data.map((item) =>
    columns.map((col) => {
      if (col.render) return col.render(item);
      return item[col.key as keyof T] as React.ReactNode;
    }),
  );

  return (
    <Card variant="table" title={title}>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-gray-700 border-collapse">
          <TableHead headers={headers} />
          <TableBody rows={rows} />
        </table>
      </div>
    </Card>
  );
}
