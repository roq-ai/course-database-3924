import axios from 'axios';
import queryString from 'query-string';
import { DataImportInterface, DataImportGetQueryInterface } from 'interfaces/data-import';
import { GetQueryInterface } from '../../interfaces';

export const getDataImports = async (query?: DataImportGetQueryInterface) => {
  const response = await axios.get(`/api/data-imports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDataImport = async (dataImport: DataImportInterface) => {
  const response = await axios.post('/api/data-imports', dataImport);
  return response.data;
};

export const updateDataImportById = async (id: string, dataImport: DataImportInterface) => {
  const response = await axios.put(`/api/data-imports/${id}`, dataImport);
  return response.data;
};

export const getDataImportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/data-imports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDataImportById = async (id: string) => {
  const response = await axios.delete(`/api/data-imports/${id}`);
  return response.data;
};
