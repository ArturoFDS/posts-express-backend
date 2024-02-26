import { Router } from "express";
const router = Router();

router.get("/blogs");
router.get("/blogs/:id");
router.post("/blogs/create");
router.put("/blogs/update/:id");
router.delete("/blogs/delete/:id");

export default router;
