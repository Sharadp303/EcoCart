const Order=require('../models/order')

async function newOrder(req,res){
    try{
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentMethod,
            paymentInfo,
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentMethod,
            paymentInfo,
            user: req.user._id,
        });

        res.status(200).json({
            order,
        });

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}


async function myOrders(req,res){
    try{
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            orders,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}


async function getOrderDetails(req,res){
    try{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
          );
        
          if (!order) {
            return res.status(404).json({error:"No Order found with this ID"});
          }
        
          res.status(200).json({
            order,
          });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

// Get all orders - ADMIN  =>
async function allOrders(req,res){
    try{
        const orders = await Order.find();

        res.status(200).json({
          orders,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

async function updateOrder(req,res){
    try{

        return res.status(404).json({error:"update needed"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

async function deleteOrder(req,res){
    try{
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({error:"No Order found with this ID"});
        }
      
        await order.deleteOne();
      
        res.status(200).json({
          success: true,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

module.exports={newOrder,getOrderDetails,myOrders,allOrders,updateOrder,deleteOrder}