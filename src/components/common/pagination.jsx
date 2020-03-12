import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ pageSize, itemCount, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={currentPage === page ? "page-item" : "page-item active"}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
