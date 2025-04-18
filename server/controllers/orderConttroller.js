import Order from "../models/Order.js";
import Product from "../models/Product.js";


// place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})
        }

        //calculating total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        //add Tax charge (2%)
        amount += Math.floor(amount * 0.2)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        })

        return res.json({success: true, message: "Order placed successfully.."})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

//Get Orders By userId : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({ createdAt: -1 })
        
        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}