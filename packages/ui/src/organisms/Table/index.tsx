import { cn } from "cn";
import type { TableHTMLAttributes } from "react";
import { type Renderable, node } from "@/lib/node";

export type TableColumn<
  Row extends Record<string, unknown> = Record<string, unknown>,
> = {
  key: string;
  label: Renderable;
  align?: "start" | "center" | "end";
  width?: string;
  render?: (row: Row, index: number) => Renderable;
};

export type TableProps<
  Row extends Record<string, unknown> = Record<string, unknown>,
> = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  "children" | "rows" | "className"
> & {
  columns: TableColumn<Row>[];
  rows: Row[];
  caption?: Renderable;
  emptyMessage?: Renderable;
  rowKey?: keyof Row & string;
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
  rowKey,
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
        {caption !== undefined && <caption>{node(caption)}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                data-align={column.align ?? "start"}
                style={{ width: column.width }}
              >
                {node(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="sph-table__empty" colSpan={columns.length}>
                {node(emptyMessage)}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowKey ? String(row[rowKey]) : rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} data-align={column.align ?? "start"}>
                    {node(
                      column.render
                        ? column.render(row, rowIndex)
                        : row[column.key],
                    )}
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
