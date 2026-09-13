export interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

/**
 * Mock saved address for the signed-in mock account. Shaped for an easy
 * swap to a Convex-backed `addresses` table once real accounts exist.
 */
export const MOCK_ADDRESS: SavedAddress = {
  id: "addr1",
  label: "Home",
  fullName: "Priya Nair",
  phone: "+91 98765 43210",
  line1: "B-42, Sector 63",
  line2: "Near Fortis Hospital",
  city: "Ghaziabad",
  state: "Uttar Pradesh",
  pincode: "201301",
  isDefault: true,
};
