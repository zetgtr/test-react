const Router = require('express')
const router = new Router()
const tableController = require('../controller/table.controller')
/**
 * Роуты для обработки запросов
 */
router.post('/get',tableController.getTable)
router.post('/sort',tableController.sortTable)
router.post('/filter',tableController.filterTable)

module.exports = router