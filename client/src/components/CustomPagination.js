import React from "react";
import "../styles/CustomPagination.css";

const CustomPagination = ({ pageCount, currentPage, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  console.log(pageCount);
  console.log(currentPage);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 2)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
