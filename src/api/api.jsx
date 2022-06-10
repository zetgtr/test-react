import axios from "axios";

/**
 * Функция получения таблицы
 * @param {Function} setCountTable - Функция записи столбцов таблицы
 * @param {Function} setTable - Функция записи полученой таблицы
 * @param {Function} setLoading - Функция изменения значения bollean для загрузки
 * @param {Function} setLastAxios - Функция записи последнего axios запроса
 * @param {Number} page - Текущая пагинация
 */
export const getTable = (
  setCountTable,
  setTable,
  setLoading,
  setLastAxios,
  page
) => {
  axios.post(`http://localhost:8081/api/get`, { page }).then((res) => {
    setCountTable(res.data[0].count);
    setTable(res.data[1]);
    setLoading(false);
    setLastAxios({ action: "get" });
  });
};
/**
 * Функция сортировки таблицы
 * @param {String} columns - Колонка для сортировки
 * @param {Function} setTable - Функция записи полученой таблицы
 * @param {Function} setLastAxios - Функция записи последнего axios запроса
 * @param {Number} page - Текущая пагинация
 */
export const sortTable = (columns, setTable, setLastAxios, page) => {
  axios
    .post(`http://localhost:8081/api/sort`, { columns, page })
    .then((res) => {
      setTable(res.data);
      setLastAxios({ action: "sort", columns });
    });
};

/**
 * Функция для фильтрации и сортировки после фильтрации
 * @param {Function} setTable - Функция записи полученой таблицы
 * @param {Function} setLastAxios - Функция записи последнего axios запроса
 * @param {Function} setCountTable - Функция записи столбцов таблицы
 * @param {String} filterColumns - Колонка для фильтрации
 * @param {Number} filterText - Условие для фильтрации
 * @param {String} filterSign - Знак для фильтрации
 * @param {Number} page - Текущая пагинация
 * @param {String} columns - Колонка для сортировки
 */
export const filterTable = (
  setTable,
  setLastAxios,
  setCountTable,
  filterColumns,
  filterText,
  filterSign,
  page,
  columns
) => {
  axios
    .post(`http://localhost:8081/api/filter`, {
      filterColumns,
      filterText,
      filterSign,
      page,
      columns,
    })
    .then((res) => {
      setCountTable(res.data[0].count);
      setTable(res.data[1]);
      setLastAxios({
        action: "filter",
        filterColumns,
        filterText,
        filterSign,
        columns,
      });
    });
};
