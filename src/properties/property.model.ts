import mongoose from "mongoose";

const floorSizeSchema = new mongoose.Schema({
  value: { type: Number, required: true },
});

const leaseLengthSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  unitText: { type: String, required: true },
});

const occupancySchema = new mongoose.Schema({
  minValue: { type: Number, required: true },
  maxValue: { type: Number, required: true },
});

const sellSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  // Dodaj inne pola dla sprzedaży, jeśli to konieczne
});

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  numberOfRooms: { type: Number, required: true },
  occupancy: { type: occupancySchema, required: true },
  floorSize: { type: floorSizeSchema, required: true },
  cardType: {
    type: String,
    required: true,
    enum: ["sell", "lease"], // cardType musi być jednym z tych dwóch: "sell" lub "lease"
  },
  lease: {
    type: leaseLengthSchema,
    required: function (this: any) {
      return this.cardType === "lease";
    },
  },
  sell: {
    type: sellSchema,
    required: function (this: any) {
      return this.cardType === "sell";
    },
  },
  numberOfBathroomsTotal: { type: Number, required: true },
  numberOfBedrooms: { type: Number, required: true },
  permittedUsage: { type: String, required: true },
  petsAllowed: { type: String, required: true },
  yearBuilt: { type: Number, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
});

export const Property = mongoose.model("Property", propertySchema);
