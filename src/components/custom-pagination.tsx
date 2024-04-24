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
import { ScrollRestoration, useSearchParams } from "react-router-dom";

const CustomPagination = ({ count, currentPage }: { count: number; currentPage: number }) => {
  const [searchParams] = useSearchParams();
  searchParams.set("page", String(currentPage - 1));
  const prevQueryString = searchParams.toString();
  searchParams.set("page", String(currentPage + 1));
  const nextQueryString = searchParams.toString();

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              to={{ search: `?${prevQueryString}` }}
              className={cn(currentPage == 1 && "pointer-events-none text-muted-foreground")}
            />
          </PaginationItem>

          {count > 5 && currentPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {Array.from(Array(count).keys()).map((page) => {
            searchParams.set("page", String(page + 1));
            const queryString = searchParams.toString();
            return (
              <PaginationItem>
                <PaginationLink
                  key={page}
                  to={`?${queryString}`}
                  className={cn(currentPage == page + 1 && "bg-muted")}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {count - currentPage > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              to={`?${nextQueryString}`}
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
