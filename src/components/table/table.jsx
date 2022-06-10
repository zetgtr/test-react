import { useEffect } from "react";
import { useState } from "react";
import { filterTable, getTable, sortTable } from "../../api/api";
import Filter from "../filter/filter";
import Pagination from "../pagination/pagination";

/**
 * Функция генерации таблицы
 * @param {Array} table - Таблица данных
 * @param {Number} countTable - Количество сталбцов всей таблицы
 * @param {Boolean} loading - Загрузка пока не получены данные
 * @param {Object} lastAxios - Последний запрос axios 
 * @param {Number} page - Страница пагинации
 * @returns возвращает таблицу либо загрузку если данные не получены
 */
const Table = () => {
  const [table, setTable] = useState();
  const [countTable, setCountTable] = useState();
  const [loading, setLoading] = useState(true);
  const [lastAxios, setLastAxios] = useState();
  const [page, setPage] = useState(1);

  /**
   * Функция для пагинации
   * @param {Number} page - Нажатая страница пагинации
   */
  const chengePageClick = (page) => {
    if (lastAxios.action === "get")
      getTable(setCountTable, setTable, setLoading, setLastAxios, page);
    if (lastAxios.action === "sort")
      sortTable(lastAxios.columns, setTable, setLastAxios, page);
    if (lastAxios.action === "filter")
      filterTable(
        setTable,
        setLastAxios,
        setCountTable,
        lastAxios.filterColumns,
        lastAxios.filterText,
        lastAxios.filterSign,
        page,
        lastAxios.columns
      );
  };

  /**
   * Функция сортировки таблицы по колонке
   * @param {String} columns - колонка по которой будет сортировка
   */
  const chengeSortTable = (columns) => {
    if (lastAxios.action === "get" || lastAxios.action === "sort")
      sortTable(columns, setTable, setLastAxios, page);
    if (lastAxios.action === "filter")
      filterTable(
        setTable,
        setLastAxios,
        setCountTable,
        lastAxios.filterColumns,
        lastAxios.filterText,
        lastAxios.filterSign,
        page,
        columns
      );
  };
  /**
   * Получение таблицы
   * Коментарий для того что бы хук useEfect не ругался на page
   */
  useEffect(() => {
    getTable(setCountTable, setTable, setLoading, setLastAxios, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <p>Загрузка...</p>;
  return (
    <main>
      <Filter
        setTable={setTable}
        setLastAxios={setLastAxios}
        setCountTable={setCountTable}
        page={page}
        setPage={setPage}
      />
      <div id="table conteiner">
        <div className="table_td">
          <div>Дата</div>
          <div
            onClick={() => {
              chengeSortTable("name");
              setPage(1);
            }}
            className="table_header"
          >
            Название
          </div>
          <div
            onClick={() => {
              chengeSortTable("quantity");
              setPage(1);
            }}
            className="table_header"
          >
            Количество
          </div>
          <div
            onClick={() => {
              chengeSortTable("distance");
              setPage(1);
            }}
            className="table_header"
          >
            Растояние
          </div>
        </div>
        {table &&
          table.map((item) => (
            <div key={item.id} className="table_td">
              <div>{item.date}</div>
              <div>{item.name}</div>
              <div>{item.quantity}</div>
              <div>{item.distance}</div>
            </div>
          ))}
      </div>
      <Pagination
        countTable={countTable}
        chengePageClick={chengePageClick}
        page={page}
        setPage={setPage}
      />
    </main>
  );
};

export default Table;
