import { Property } from "./property.model";
import mongoose from "mongoose";

export const findAllProperties = async (): Promise<any> => {
  const properties: any = await Property.find();
  if (properties) {
    return properties;
  }
  return null;
};

export const findProperty = async (id: string): Promise<any> => {
  const property: any = await Property.findOne({ _id: id });
  if (property) {
    return property;
  }
  return null;
};

export const createProperty = async (newProperty: any): Promise<any> => {
  const property = new Property({
    _id: new mongoose.Types.ObjectId(),
    ...newProperty,
  });

  const result: any = await property.save();
  return result;
};

export const updateProperty = async (
  id: string,
  propertyUpdate: any
): Promise<any> => {
  let property = await findProperty(id);

  const updatedProperty: any = await Property.findOneAndUpdate(
    { _id: id },
    { $set: { ...propertyUpdate } },
    { returnOriginal: false }
  );

  if (!updatedProperty) {
    return null;
  }

  return updatedProperty;
};

export const removeProperty = async (id: string): Promise<any> => {
  const deleted = Property.deleteOne({ _id: id });
  if (!deleted) {
    return null;
  }

  return deleted;
};
