import { IProperty } from "./property.interface";
import { Property } from "./property.model";
import mongoose from "mongoose";

export const findAllProperties = async (): Promise<IProperty[] | null> => {
  const properties: IProperty[] = await Property.find();
  if (properties) {
    return properties;
  }
  return null;
};

export const findProperty = async (id: string): Promise<IProperty | null> => {
  const property: IProperty | null = await Property.findOne({ _id: id });
  if (property) {
    return property;
  }
  return null;
};

export const createProperty = async (
  newProperty: IProperty,
  newProfileImages: string[],
  userId: string
): Promise<any> => {
  const property = new Property({
    _id: new mongoose.Types.ObjectId(),
    ...newProperty,
    images: newProfileImages,
    authorId: userId,
  });

  const result: any = await property.save();
  return result;
};

export const updateProperty = async (
  id: string,
  propertyUpdate: IProperty
): Promise<IProperty | null> => {
  const updatedProperty: IProperty | null = await Property.findOneAndUpdate(
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
