const db = require("../models");
const User = db.User;
//User Controller
module.exports = {
    index:async (req,res)=>{
        res.status(200).json({
            message:"Index",
            user: await User.findAll()
        });
    },
    store:(req,res)=>{
    	let { firstName,lastName,email,password } = req.body;
    	if(firstName && lastName && email && password){

    		User.create({
    			firstName:firstName,
    			email:email,
    			lastName:lastName,
    			password:password
    		})
			.then(userdoc =>{
				res.status(200).json({
					message:"success",
					user:userdoc
				});
			}, error =>{
				res.status(400).json({
					message:"failed"
				});
			})


    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    show:async (req,res)=>{
    	let { id } = req.params;
    	if(id){
    			try{
    				let user = await User.findAll({
						where:{
							id:id
						}
					});
    		    	res.status(200).json(user);
    			}
    			catch(error){
					console.log(error)
    		    	res.status(400).json({message:"Could not fetch user"});
    			}
    	} else {
    		res.status(422).json({
    			message:"invalid inputs"
    		});
    	}

    },
    update:async (req,res)=>{
    	let { id } = req.params;
    	let { firstName,lastName,email,password } = req.body;
    
    	if(id){
    		if(firstName && lastName && email && password){
    				try{
    					let user = await User.update({
							firstName:firstName,
							email:email,
							lastName:lastName,
							password:password
						},{
    						where:{
								id:id
    						}
    					});
    					if(user){
    			    		res.status(200).json({message:"User Updated"});
    					} else {
    						res.status(422).json({
    							message:"User not found"
    						});
    					}
    				}
    				catch(error){
    			    	res.status(400).json({message:"Could not update user"});
    				}
    		} else {
    			res.status(422).json({
    				message:"invalid inputs"
    			});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}

    },
    delete:async (req,res)=>{
    	let { id } = req.params;
    	if(id){
    		try{
    			let user = await User.destroy({
					where:{
						id:id
					}
				});
    			if(user){
    				res.status(200).json({message:"User Deleted"});
    			} else {
    				res.status(422).json({
    					message:"User not found"
    				});
    			}
    			
    		}
    		catch(error){
				res.status(400).json({message:"Could not delete user"});
    		}
    	} else {
    		res.status(422).json({
    			message:"Invalid ID"
    		});
    	}
    }
    
};