const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rotas CRUD
router.get("/test-db-connection", productController.testDbConnection);
router.get("/create-products-table", productController.createTable);

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
