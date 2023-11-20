export interface IOccupancy {
  minValue: number;
  maxValue: number;
}
export interface IProperty {
  type:
    | "Single-Family Home"
    | "Apartment"
    | "Condominium"
    | "Townhouse"
    | "Multi-Family Home";
  authorId: string;
  name: string;
  description: string;
  images: string[];
  numberOfRooms: number;
  occupancy: IOccupancy;
  floorSize: number;
  cardType: "sell" | "lease";
  leaseLength?: number;
  leasePrice?: number;
  sellPrice?: number;
  numberOfBathroomsTotal: number;
  numberOfBedrooms: number;
  permittedUsage: string;
  petsAllowed: string;
  yearBuilt: number;
  address: string;
  telephone: string;
}
