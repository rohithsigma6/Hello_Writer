import { api } from "@/lib/api-client";

export type LocationRequest = {
    fileId: string;
    isEditing: boolean;
    id?: string;
    locationId: string;
    payload: {
      name: string;
      description?: string;
      [key: string]: any; // Allows additional fields
    };
  };
  

//   export type LocationRequest = {
//     fileId: string;
//     [key: string]: any; // Allows additional fields
//   };
export type DeleteLocationRequest = {
  fileId: string;
  locationId: string;
};
type GetLocationParams = {
  fileId: string;
  locationId: string;
};

export const getSubLocationById = ({ fileId, locationId }: GetLocationParams) => {
  const params = new URLSearchParams({ fileId, locationId }).toString();
  return api.get(`/api/co-writer/location?${params}`);
};
export const deleteSubLocation = async ({ locationId, fileId }: DeleteLocationRequest): Promise<any> => {
  return api.delete(`api/co-writer/location/subLocation/delete/${locationId}/${fileId}`);
};
  export const getSubLocation = async (body: LocationRequest): Promise<any> => {
    return api.get(`api/co-writer/location/${body.fileId}/${body.locationId}`);
  };
  export const addSubLocation = async (body: LocationRequest): Promise<any> => {
    const endpoint = `api/co-writer/location/subLocation/${body.isEditing ? `update/${body.locationId}/${body.id}` :`add/${body.locationId}`}`;
    return  body.isEditing ? api.put(endpoint, body.payload): api.post(endpoint, body.payload);
  };