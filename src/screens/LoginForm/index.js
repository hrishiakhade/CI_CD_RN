import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import * as Yup from 'yup';
import { storeData } from '../../utils/secureStore';
import { useFormikContext , Formik} from 'formik';

export const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  // const { setFieldValue } = useFormikContext();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name cannot be empty').min(3, 'Name must be at least 3 characters').max(15, 'Name must be at most 15 characters'),
    email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
    password: Yup.string()
      .required('Password cannot be empty')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
  })

  const handleSubmit = (values) => {
    setLoading(true);
    storeData(values.name, values.email, values.password).then((res) => {
      console.log('res', res);
      setLoading(false);
      setTimeout(() => {
        Alert.alert('Success', 'Data saved successfully');
        // setFieldValue('name', '');
        // setFieldValue('email', '');
        // setFieldValue('password', '');
      }, 500);
    }).catch((err) => {
      console.log('err', err);
      setLoading(false);
      setTimeout(() => {
        Alert.alert('Error', err.message);
      }, 500);
    });

  }

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => { handleSubmit(values) }}

    >
      {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors, isValid }) => (
        <View style={{ borderWidth: 1, borderRadius: 20, padding: 20, width: '100%' }}>

          <TextInput
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            value={values.name}
            style={{ marginBottom: 3, backgroundColor: 'green', borderRadius: 20 }}
          />
          {touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}



          <TextInput
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            value={values.email}
            style={{ marginBottom: 3, backgroundColor: 'green', borderRadius: 20 }}
          />
          {touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextInput
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            value={values.password}
            secureTextEntry
            style={{ marginBottom: 3, backgroundColor: 'green', borderRadius: 20 }}
          />
          {touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isValid}
            style={{ backgroundColor: isValid ? 'green' : 'red', padding: 10, borderRadius: 20, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
