const express = require("express")

const productModel = require("../model/model.product")
const middle = require("../middleware/private")

const pro_Routes = express.Router()

pro_Routes.get("/form", middle ,(req,res)=>{
    res.render("form")
})

pro_Routes.post("/formData",async(req,res)=>{
    console.log(req.body,"data come from the routes")
    const {productName,price,rate,category,quantity,description} = req.body
    let product = new productModel({productName,price,rate,category,quantity,description})
    await product.save()
    console.log(product)
})

pro_Routes.get("/getData",async(req,res)=>{
    try {
        console.log("Attempting to fetch data...");
        let data = await productModel.find()
        console.log(data)
        // const infoMessage = req.flash("info")
        // console.log(infoMessage)
        // res.render("home",{data,infoMessage})
        res.render("home",{data})
    } catch (error) {
        console.error(error)
        res.status(400).json({msg:"data not found",error:error.message})
    }
})



// pro_Routes.get("/delete", async (req, res) => {
//     let id = req.query.id;
//     console.log(id);
//     try {
//         let deleteData = await productModel.findByIdAndDelete(id);
//         console.log(deleteData);
//         if (deleteData) {
//             res.redirect("/proRoute/getData");
//         } else {
//             res.status(404).json({ message: "Data not found" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error deleting data" });
//      }
// })

pro_Routes.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        const deleteData = await productModel.findByIdAndDelete(id);
        // req.flash('info', 'Data delete successfully');
        res.status(200).json({msg:"data deleted succesfully",deleteData})
    } catch (error) {
        res.status(400).json({msg:"Something is wrong",error})
    }
})

pro_Routes.get("/edit/:id",async(req,res)=>{
    // res.render("editPage")
    let { id } = req.params;   // we should use params insteda of query
    const data = await productModel.findById(id);
    if (!data) {
        return res.status(404).json({ msg: "Product not found" });
    }
    console.log(data)
    res.render("editPage", { data });
})

pro_Routes.patch("/editData/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {productName,price,rate,category,quantity,description } = req.body;
        console.log(req.body)

        // find by id and update the product
        let updatedProduct = await productModel.findByIdAndUpdate(id, { productName,price,rate,category,quantity,description });
        if (!updatedProduct) {
            return res.status(404).json({ msg: "product not found" });
        }
        // req.flash("info", "Data updated successfully")
        res.status(200).json({ msg: "product updated successfully", updatedProduct });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
});

// logout
pro_Routes.post("/logout", (req, res) => {
    res.clearCookie('authToken');  // clear the cookie
    res.status(200).json({ msg: "Logged out successfully" });
});




module.exports = pro_Routes