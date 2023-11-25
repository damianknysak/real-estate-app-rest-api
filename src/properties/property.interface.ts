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
  floorSize: number;
  cardType: "sell" | "lease";
  leaseLength?: number;
  leasePrice?: number;
  sellPrice?: number;
  numberOfBathroomsTotal: number;
  numberOfBedrooms: number;
  permittedUsage: string;
  petsAllowed: boolean;
  yearBuilt: number;
  address: string;
  telephone: string;
}
