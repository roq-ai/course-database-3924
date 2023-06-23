import { DataImportInterface } from 'interfaces/data-import';
import { FileInterface } from 'interfaces/file';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  data_import?: DataImportInterface[];
  file?: FileInterface[];
  user?: UserInterface;
  _count?: {
    data_import?: number;
    file?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
