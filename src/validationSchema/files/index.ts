import * as yup from 'yup';

export const fileValidationSchema = yup.object().shape({
  file_type: yup.string().required(),
  file_name: yup.string().required(),
  file_path: yup.string().required(),
  organization_id: yup.string().nullable(),
});
