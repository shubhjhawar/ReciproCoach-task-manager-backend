const { Router } = require('express');
const columnController = require('../../controller/columns');

const router = Router();

router
  .route("/")
  .post(columnController.createColumn)
  .get(columnController.getColumns);

router
  .route("/:id")
  .get(columnController.getColumn)
  .put(columnController.updateColumn)
  .delete(columnController.deleteColumn);

module.exports = router;
