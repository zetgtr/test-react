/**
 * Функция создания пагинации
 * @param {Number} countTable - Количество сталбцов всей таблицы
 * @param {Function} chengePageClick - Функция нажатия на элемент пагинации
 * @param {Number} page - Текущая пагинация
 * @param {Function} setPage - Функция изменения текущей пагинации
 * @returns - Возвращает пагинацию
 */
const Pagination = ({ countTable, chengePageClick, page, setPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countTable / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li
            className={num === page ? "pagination_activ" : "pagination_num"}
            key={num}
            onClick={() => {
              chengePageClick(num);
              setPage(num);
            }}
          >
            {num}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
