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
import { useSearchParams } from "react-router-dom";

function generatePagination(total_results: number, start_number: number, results_page = 10) {
  // Test that the first 3 arguments are finite numbers.
  // Using Array.prototype.every() and Number.isFinite().
  const allNumbers = [total_results, results_page, start_number].every(Number.isFinite);

  // Throw an error if any of the first 3 arguments is not a finite number.
  if (!allNumbers) {
    throw new TypeError("pagination() expects only finite numbers as arguments.");
  }

  // Ensure the step is always a positive number.
  if (total_results <= 0) {
    throw new Error("total_results must be a number greater than 0.");
  }
  if (results_page <= 0) {
    throw new Error("results_page must be a number greater than 0.");
  }
  if (start_number < 0) {
    throw new Error("start_number must be a number greater than or equal to 0.");
  }

  // Determine the length of the array to be returned, which is the total
  // results divided by the number of results per page.
  const length = Math.ceil(total_results / results_page);
  // 10 pages or less, just return the array
  if (length <= 10) {
    // Fill up a new array with the range numbers
    // using Array.from() with a mapping function.
    let full_array = Array.from(Array(length), (x, index) => index + 1);
    return full_array;
  }

  let current_page = start_number / results_page + 1;
  if (start_number == 1) {
    current_page = 1;
  }

  let pages = new Array();
  for (let i = 1; i <= length; i++) {
    // If the current page is 7 or less, show pages 1-7, then ellipses, then
    // the last two pages
    if (current_page < 7 && i < 7) {
      pages.push(i);
      continue;
    }

    if (i == 8 && current_page < 6) {
      pages.push("...");
      continue;
    }

    // if the current page is within six places of the last page, show the
    // last six pages.
    if (current_page > length - 5 && i > length - 5) {
      pages.push(i);
      continue;
    }

    if (i == length - 6 && current_page > length - 4) {
      pages.push("...");
      continue;
    }

    // Show the first two pages, the current page surrounded by a page and
    // ellispses, then the last two pages
    if (i < 3) {
      pages.push(i);
    } else if (i == current_page - 1) {
      pages.push("...");
      pages.push(i);
    } else if (i == current_page) {
      pages.push(i);
      continue;
    } else if (i == current_page + 1 && current_page < length - 3) {
      pages.push(i);
      pages.push("...");
    }

    if (i == length - 1 || i == length) {
      pages.push(i);
    }
  }

  return pages;
}

const CustomPagination = ({
  count,
  currentPage,
  perPage = 10,
}: {
  count: number;
  currentPage: number;
  perPage?: number;
}) => {
  const [searchParams] = useSearchParams();
  searchParams.set("page", String(currentPage - 1));
  const prevQueryString = searchParams.toString();
  searchParams.set("page", String(currentPage + 1));
  const nextQueryString = searchParams.toString();
  const pages = generatePagination(count, currentPage, perPage);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem key="prev">
            <PaginationPrevious
              to={{ search: `?${prevQueryString}` }}
              className={cn(currentPage == 1 && "pointer-events-none text-muted-foreground")}
            />
          </PaginationItem>

          {pages.map((page) => {
            searchParams.set("page", String(page));
            const queryString = searchParams.toString();

            return (
              <PaginationItem key={page}>
                {page == "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    to={`?${queryString}`}
                    className={cn(currentPage == page && "bg-muted")}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}
          <PaginationItem key="next">
            <PaginationNext
              to={`?${nextQueryString}`}
              className={cn(
                currentPage == Math.ceil(count / perPage) &&
                  "pointer-events-none text-muted-foreground"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default CustomPagination;
