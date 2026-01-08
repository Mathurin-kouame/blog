
interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalPage, currentPage, onPageChange }: PaginationProps) => {
  const handleOnPageChange = (index: number) => {
    onPageChange(index + 1)
  }
  return (
    <ul className="pagination">
      {
        [...Array(totalPage).keys()].map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => handleOnPageChange(index)}>{index + 1}</a>
          </li>
        ))
      }
    </ul>
  )
}
