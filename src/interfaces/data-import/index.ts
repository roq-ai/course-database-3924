import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DataImportInterface {
  id?: string;
  source_type: string;
  data: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface DataImportGetQueryInterface extends GetQueryInterface {
  id?: string;
  source_type?: string;
  data?: string;
  organization_id?: string;
}
