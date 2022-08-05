const express =  require("express");
const router = express.Router()
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require("../controller/userController");


router.get("/",getAllUsers)
router.post("/add", createUser)

router.get("/:id",getUser)
router.patch("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)


module.exports = router;