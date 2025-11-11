import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 bg-white rounded-xl border border-[#f7f7f7] px-6 py-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="#243C7B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-medium transition-colors ${
              page === currentPage
                ? "bg-[#243C7B] text-white"
                : page === "..."
                ? "cursor-default text-[#787486]"
                : "text-[#243C7B] hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="#243C7B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-gray-50 min-w-[130px] justify-between"
          >
            <span className="text-sm font-medium text-[#243C7B]">
              {itemsPerPage} / Page
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M13.28 10.5333C13.1533 10.5333 13.0267 10.4867 12.9267 10.3867L8.58001 6.04C8.26001 5.72 7.74001 5.72 7.42001 6.04L3.07335 10.3867C2.88001 10.58 2.56001 10.58 2.36668 10.3867C2.17335 10.1933 2.17335 9.87333 2.36668 9.68L6.71335 5.33333C7.42001 4.62666 8.57335 4.62666 9.28668 5.33333L13.6333 9.68C13.8267 9.87333 13.8267 10.1933 13.6333 10.3867C13.5333 10.48 13.4067 10.5333 13.28 10.5333Z"
                fill="#243C7B"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-10 min-w-[130px]">
              {[10, 20, 50, 100].map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    onItemsPerPageChange(value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                    itemsPerPage === value ? "bg-gray-100" : ""
                  }`}
                >
                  {value} / Page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;