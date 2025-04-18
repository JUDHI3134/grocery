import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

//Add product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            })
        )

        await Product.create({ ...productData, image: imagesUrl })
        res.json({success: true, message: "Product Added."})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//List product: /api/product/list
export const productList = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//get single product: /api/product/id
export const productById = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//change product inStock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}