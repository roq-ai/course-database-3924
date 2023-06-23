import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getDataImportById, updateDataImportById } from 'apiSdk/data-imports';
import { Error } from 'components/error';
import { dataImportValidationSchema } from 'validationSchema/data-imports';
import { DataImportInterface } from 'interfaces/data-import';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function DataImportEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<DataImportInterface>(
    () => (id ? `/data-imports/${id}` : null),
    () => getDataImportById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DataImportInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDataImportById(id, values);
      mutate(updated);
      resetForm();
      router.push('/data-imports');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<DataImportInterface>({
    initialValues: data,
    validationSchema: dataImportValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Data Import
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="source_type" mb="4" isInvalid={!!formik.errors?.source_type}>
              <FormLabel>Source Type</FormLabel>
              <Input type="text" name="source_type" value={formik.values?.source_type} onChange={formik.handleChange} />
              {formik.errors.source_type && <FormErrorMessage>{formik.errors?.source_type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="data" mb="4" isInvalid={!!formik.errors?.data}>
              <FormLabel>Data</FormLabel>
              <Input type="text" name="data" value={formik.values?.data} onChange={formik.handleChange} />
              {formik.errors.data && <FormErrorMessage>{formik.errors?.data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'data_import',
  operation: AccessOperationEnum.UPDATE,
})(DataImportEditPage);
