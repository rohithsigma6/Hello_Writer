import { api } from "@/lib/api-client";

export type LocationRequest = {
    fileId: string;
    isEditing: boolean;
    id?: string;
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

export const getLocationById = ({ fileId, locationId }: GetLocationParams) => {
  const params = new URLSearchParams({ fileId, locationId }).toString();
  return api.get(`/api/co-writer/location?${params}`);
};
export const deleteLocation = async ({ locationId, fileId }: DeleteLocationRequest): Promise<any> => {
  return api.delete(`api/co-writer/location/delete/${locationId}/${fileId}`);
};
  export const getLocation = async (body: LocationRequest): Promise<any> => {
    return api.post(`api/co-writer/location`, body);
  };
  export const addLocation = async (body: LocationRequest): Promise<any> => {
    const endpoint = `api/co-writer/location/${body.isEditing ? `update/${body.id}` : 'save'}`;
    return api.post(endpoint, body.payload);
  };