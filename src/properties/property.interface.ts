import mongoose from "mongoose";

interface FloorSize {
  value: number;
}

interface LeaseLength {
  value: number;
  unitText: string;
}

interface Occupancy {
  minValue: number;
  maxValue: number;
}

interface Sell {
  price: number;
}

interface Property {
  type: string;
  name: string;
  description: string;
  imageUrl: string;
  numberOfRooms: number;
  occupancy: Occupancy;
  floorSize: FloorSize;
  cardType: "sell" | "lease";
  lease?: LeaseLength;
  sell?: Sell;
  numberOfBathroomsTotal: number;
  numberOfBedrooms: number;
  permittedUsage: string;
  petsAllowed: string;
  yearBuilt: number;
  address: string;
  telephone: string;
}

export const propertySchema = new mongoose.Schema<Property>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  numberOfRooms: { type: Number, required: true },
  occupancy: { type: Object, required: true },
  floorSize: { type: Object, required: true },
  cardType: {
    type: String,
    required: true,
    enum: ["sell", "lease"],
  },
  lease: {
    type: Object,
    required: function (this: Property) {
      return this.cardType === "lease";
    },
  },
  sell: {
    type: Object,
    required: function (this: Property) {
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

export const PropertyModel = mongoose.model<Property>(
  "Property",
  propertySchema
);
