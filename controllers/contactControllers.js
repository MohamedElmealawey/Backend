const { sendContactMessage } = require("../mailtrap/mailtrapConfig");
const contactModel = require("../models/contactModel");

exports.createContact = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
  
      if (!name || !email || !subject || !message) {
        return res.status(400).send({
          success: false,
          message: "All fields are required: name, email, subject, message.",
        });
      }
  
      const mailtrapResponse = await sendContactMessage(name, email, subject, message);
  
      const newContact = await contactModel.create({
        name,
        email,
        subject,
        message,
      });
  
      if (!newContact && !mailtrapResponse) {
        return res.status(500).send({
          success: false,
          message: "Failed to save contact message. Please try again later.",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "Your message has been delivered successfully.",
      });
      
    } catch (error) {
      console.error("Error in createContact:", error.message);
      return res.status(500).send({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
};
exports.getAllContact=async(req,res)=>{
    try{

        const allContact=await contactModel.find({});

        if(!allContact){
            return res.status(400).send({
                success:false,
                message:"Error!"
            })
        }

        return res.status(200).send({
            success:true,
            contacts:allContact,
        })
    }catch(e){
        console.log(e.message)
    }
}
exports.removeContact=async(req,res)=>{
    try{
        const {contactID}=req.params;

        const response=await contactModel.findByIdAndDelete(contactID);

        if(response){
            return res.status(200).send({
                success:true,
                message:"Message deleted."
            })
        }else{
            return res.status(400).send({
                success:false,
                message:"No message for this id."
            })
        }

    }catch(error){
        console.log(error.message)
    }
}