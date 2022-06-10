import { useState } from "react";
import { filterTable } from "../../api/api";
/**
 * Функция для фильтрации по условию
 * @param {Function} setTable - Функция записи таблицы
 * @param {Function} setLastAxios - Функция записи последнего запроса axios
 * @param {Function} setCountTable - Функция записи количества столбцов таблицы
 * @param {Function} setPage - Функция изменения текущей пагинации
 * @param {String} filterColumns - Условие для фильтрации по колонке
 * @param {Number} filterText - Условие для фильтрации
 * @param {String} filterSign - Знак для фильтрации
 * @returns Возвращает элементы фильтрации
 */
const Filter = ({ setTable, setLastAxios, setCountTable, setPage }) => {
  const [filterColumns, setFilterColumns] = useState("quantity");
  const [filterText, setFilterText] = useState(1);
  const [filterSign, setFilterSign] = useState("<");
  /**
   * Функция для получения результата фильтрации
   */
  const chengeFilterTable = () => {
    filterTable(
      setTable,
      setLastAxios,
      setCountTable,
      filterColumns,
      filterText,
      filterSign,
      1
    );
  };
  return (
    <nav className="filter">
      <select onChange={(e) => setFilterColumns(e.target.value)}>
        <option value="quantity">Количество</option>
        <option value="distance">Растояние</option>
      </select>
      <input
        type="number"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <select onChange={(e) => setFilterSign(e.target.value)}>
        <option value="<">Меньше</option>
        <option value=">">Больше</option>
        <option value="=">Равно</option>
      </select>
      <input
        type="button"
        onClick={() => {
          setPage(1);
          chengeFilterTable();
        }}
        value="Выбрать"
      />
    </nav>
  );
};

export default Filter;
