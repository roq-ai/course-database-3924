import * as yup from 'yup';

export const dataImportValidationSchema = yup.object().shape({
  source_type: yup.string().required(),
  data: yup.string().required(),
  organization_id: yup.string().nullable(),
});
