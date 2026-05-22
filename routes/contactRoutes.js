const experss=require("express");
const { createContact, getAllContact, removeContact } = require("../controllers/contactControllers");
const contactRouter=experss.Router();

contactRouter.post("/createContact",createContact);
contactRouter.get("/allContacts",getAllContact);
contactRouter.delete("/removeMessage/:contactID",removeContact);

module.exports=contactRouter;