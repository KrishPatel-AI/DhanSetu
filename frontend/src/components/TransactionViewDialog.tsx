import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Badge } from "@/components/ui/badge";
  import { Transaction } from "@/api/TransactionsAPI";
  
  interface TransactionViewDialogProps {
    transaction: Transaction | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export function TransactionViewDialog({
    transaction,
    open,
    onOpenChange,
  }: TransactionViewDialogProps) {
    if (!transaction) return null;
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">ID:</span>
              <span className="col-span-3">{transaction.id}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Date:</span>
              <span className="col-span-3">{transaction.date}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Type:</span>
              <span className="col-span-3">
                <Badge variant={transaction.type === "Income" ? "default" : "destructive"}>
                  {transaction.type}
                </Badge>
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Amount:</span>
              <span 
                className={`col-span-3 ${
                  transaction.type === "Income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Method:</span>
              <span className="col-span-3">{transaction.method}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">From:</span>
              <span className="col-span-3">{transaction.from}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">To:</span>
              <span className="col-span-3">{transaction.to}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Status:</span>
              <span className="col-span-3">
                <Badge
                  variant={
                    transaction.status === "Completed"
                      ? "secondary"
                      : transaction.status === "Pending"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }