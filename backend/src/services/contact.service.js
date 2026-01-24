import Contact from "../models/Contact.js";

export const createContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    return await newContact.save();
  } catch (error) {
    throw error;
  }
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};