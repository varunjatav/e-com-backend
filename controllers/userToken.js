import UserToken from "../models/userToken.js"
import User from "../models/user.js";
 export const getUserToken = async (req,res) =>{
    try {
        const user = await User.find();
        // console.log(user);
       const token = await UserToken.findOne({useId:user._id}); 
    //    console.log(token);
       if(!token){
        console.log("token not found");
        return
       }
       res.status(200).json(token);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const deleteUserToken = async (req, res) =>{
    try {
        const user = await User.find();
        // console.log(user);
       const token = await UserToken.findOne({useId:user._id}); 
        if (!token) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = user.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            token.items.splice(itemIndex, 1);
            await token.save();
            res.status(200).json({message: "token removed successfully"});
        }
     
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
   

}