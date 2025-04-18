import jwt from "jsonwebtoken"

//Login seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            
            res.cookie('sellerToken', token, {
                httpOnly: true, //prevent javascript to access cookie
                secure: process.env.NODE_ENV === 'production', //use secure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
                maxAge: 7*24*60*60*1000, //cookie expiration time
            })
    
            return res.json({success: true, message: "Logged in"})
        } else {
            return res.json({success: false, message: "Invalid credential"})
        }
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}