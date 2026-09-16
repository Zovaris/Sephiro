import { cn } from "cn";
import type { TableHTMLAttributes } from "react";

export type TableColumn<
  Row extends Record<string, unknown> = Record<string, unknown>,
> = {
  key: string;
  label: unknown;
  align?: "start" | "center" | "end";
  width?: string;
  render?: (row: Row, index: number) => unknown;
};

export type TableProps<
  Row extends Record<string, unknown> = Record<string, unknown>,
> = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  "children" | "rows" | "className"
> & {
  columns: TableColumn<Row>[];
  rows: Row[];
  caption?: unknown;
  emptyMessage?: unknown;
  density?: "compact" | "comfortable";
  striped?: boolean;
  stickyHeader?: boolean;
  className?: string;
};

export function Table<
  Row extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  rows,
  caption,
  emptyMessage = "No results",
  density = "comfortable",
  striped = false,
  stickyHeader = false,
  className,
  ...props
}: TableProps<Row>) {
  return (
    <div className={cn("sph-table-wrap", className)}>
      <table
        {...props}
        className="sph-table"
        data-density={density}
        data-striped={striped || undefined}
        data-sticky-header={stickyHeader || undefined}
      >
        {caption !== undefined && <caption>{caption as any}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                data-align={column.align ?? "start"}
                style={{ width: column.width }}
              >
                {column.label as any}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="sph-table__empty" colSpan={columns.length}>
                {emptyMessage as any}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} data-align={column.align ?? "start"}>
                    {
                      (column.render
                        ? column.render(row, rowIndex)
                        : row[column.key]) as any
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
