import { httpClient } from './httpClient';
import { IPaginatedResponse } from './types';

interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel:  string;
  vehicleManufacturer: string;
}

async function delay(ms: number = 200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class ClientsService {
  static async getAll(page: number = 1, perPage: number = 10) {
    await delay();

    const { data } = await httpClient.get<IPaginatedResponse<IClient[]>>('/clients', {
      params: {
        _page: page,
        _per_page: perPage
      }
    });

    return data;
  }
}
