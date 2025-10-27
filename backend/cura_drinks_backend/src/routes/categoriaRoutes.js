const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");


// Rotas CRUD
router.get("/test-db-connection", categoriaController.testDbConnection);
router.get("/create-categorias-table", categoriaController.createTable);

router.post("/", categoriaController.addCategoria);
router.get("/", categoriaController.getAllCategorias);
router.get("/:id", categoriaController.getCategoriaById);
router.put("/:id", categoriaController.updateCategoria);
router.delete("/:id", categoriaController.deleteCategoria);

module.exports = router;
