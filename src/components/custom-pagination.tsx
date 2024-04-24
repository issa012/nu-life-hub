import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ScrollRestoration } from "react-router-dom";

const CustomPagination = ({ count, currentPage }: { count: number; currentPage: number }) => {
  const arrayRange = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

  console.log(arrayRange(1, 5, 1));

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              to={`?page=${+currentPage - 1}`}
              className={cn(currentPage == 1 && "pointer-events-none text-muted-foreground")}
            />
          </PaginationItem>

          {count > 5 && currentPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {Array.from(Array(count).keys()).map((page, id) => (
            <PaginationItem>
              <PaginationLink
                to={`?page=${page + 1}`}
                className={cn(currentPage == page + 1 && "pointer-events-none bg-muted")}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {count - currentPage > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              to={`?page=${+currentPage + 1}`}
              className={cn(currentPage == count && "pointer-events-none text-muted-foreground")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ScrollRestoration />
    </div>
  );
};
export default CustomPagination;
