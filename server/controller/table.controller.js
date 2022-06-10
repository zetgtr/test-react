const db = require("../db");

class TableController {
  /**
   * Функция получения 10 столбцов таблицы от условия пагинации в формате даты день.месяц.год и получения количества всех столбцов в таблице
   * @param {Number} page - Текущая пагинация
   */
  async getTable(req, res) {
    const { page } = req.body;
    const { rows } = await db.query(
      "SELECT * , to_char(date, 'dd.mm.yyyy') as date FROM public.table OFFSET $1 LIMIT 10",
      [(page - 1) * 10]
    );
    const count = await db.query("SELECT COUNT(*) FROM public.table ");
    const data = [count.rows[0], rows];
    res.json(data);
  }
  /**
   * Функция получения 10 столбцов таблицы от условия пагинации в формате даты день.месяц.год с сортрировкой по колонке
   * @param {Number} page - Текущая пагинация
   * @param {String} columns - Колонка для сортировки
   */
  async sortTable(req, res) {
    const { columns, page } = req.body;
    const query = `SELECT * , to_char(date, 'dd.mm.yyyy') as date FROM public.table ORDER BY ${columns} OFFSET $1 LIMIT 10`;
    const { rows } = await db.query(query, [(page - 1) * 10]);
    res.json(rows);
  }
  /**
   * Функция для фильтрации таблицы по условию.
   * Получение 10 столбцов таблицы от условия пагинации в формате даты день.месяц.год с сортрировкой по колонке если оно есть.
   * Получение количества всех столбцов в таблице от условия фильтрации
   * @param {String} columns - Колонка для сортировки
   * @param {Number} page - Текущая пагинация
   * @param {String} filterColumns - Колонка для фильтрации
   * @param {Number} filterText - Условие для фильтрации
   * @param {String} filterSign - Знак для фильтрации
   */
  async filterTable(req, res) {
    const { columns, page, filterColumns, filterText, filterSign } = req.body;
    const query = `SELECT * , to_char(date, 'dd.mm.yyyy') as date FROM public.table WHERE ${
      filterColumns + filterSign
    } $1 ${columns ? "ORDER BY " + columns : ""} OFFSET $2 LIMIT 10`;
    const countQuery = `SELECT COUNT(*) FROM public.table WHERE ${
      filterColumns + filterSign
    } $1`;
    const count = await db.query(countQuery, [filterText]);
    const { rows } = await db.query(query, [filterText, (page - 1) * 10]);
    const data = [count.rows[0], rows];
    res.json(data);
  }
}

module.exports = new TableController();
