"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TransactionsTableProps {
  data: any[];
  visibleColumns: Record<string, boolean>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TransactionsTable({
  data,
  visibleColumns,
  currentPage,
  totalPages,
  onPageChange,
}: TransactionsTableProps) {
  const columnKeys = Object.keys(visibleColumns);

  const getBadgeVariant = (value: string) => {
    const lowercaseValue = value.toLowerCase();
    switch (lowercaseValue) {
      case 'income':
        return 'default';
      case 'expense':
        return 'destructive';
      case 'completed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const shouldUseBadge = (column: string, value: string) => {
    const lowercaseValue = value?.toLowerCase();
    return (
      (column === 'Type' && ['income', 'expense'].includes(lowercaseValue)) ||
      (column === 'Status' && ['completed', 'failed', 'pending'].includes(lowercaseValue))
    );
  };

  const getAmountColor = (row: any) => {
    const type = row.type?.toLowerCase();
    return type === 'income' ? 'text-green-500' : type === 'expense' ? 'text-red-500' : '';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columnKeys.map(
                (column) =>
                  visibleColumns[column] && <TableHead key={column}>{column}</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columnKeys.map(
                    (column) =>
                      visibleColumns[column] && (
                        <TableCell key={column}>
                          {shouldUseBadge(column, row[column]) ? (
                            <Badge variant={getBadgeVariant(row[column])}>
                              {row[column]}
                            </Badge>
                          ) : column === 'amount' ? (
                            <span className={cn("font-medium", getAmountColor(row))}>
                              {row[column]}
                            </span>
                          ) : (
                            row[column]
                          )}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnKeys.length} className="text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}