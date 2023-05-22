import axios from 'axios';

// const { REACT_APP_BASE_URL } = process.env;

// const instance = axios.create({
//   baseURL: REACT_APP_BASE_URL,
// });

const instance = axios.create({
  baseURL: 'https://yourpet-backend-3yf8.onrender.com/api',
});

export const setToken = token => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};

export const register = async data => {
  const { data: result } = await instance.post('/auth/register', data);
  if (result) {
    const { email, password } = data;
    const { data: result } = await instance.post('/auth/login', {
      email,
      password,
    });
    setToken(result.accessToken);
    return result;
  }
  return result;
};

export const login = async data => {
  const { data: result } = await instance.post('/auth/login', data);
  await setToken(result.accessToken);
  return result;
};

export const getCurrent = async token => {
  try {
    setToken(token);
    const { data } = await instance.get('/auth/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const logout = async () => {
  const { data } = await instance.post('/auth/logout');
  setToken();
  return data;
};

export const getUser = async token => {
  try {
    setToken(token);
    const { data: result } = await instance.get('/user', token);
    return result;
  } catch (error) {
    throw error;
  }
};
// export const addContact = async data => {
//   const { data: result } = await instance.post('/contacts', data);
//   return result;
// };

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post('/contacts', data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const updateUserInf = async (fieldToUpdate, newValue, token) => {
  setToken(token);
  const data = {
    [fieldToUpdate]: newValue,
  };
  const { data: result } = await instance.patch('/user', data, token);
  return result;
};

export const updateAvatar = async (token, formData) => {
  setToken(token);
  const { data: result } = await instance.patch('/user', formData, token);
  return result;
};

export const deleteUserPet = async id => {
  console.log(id);
  const { data } = await instance.delete(`/user/pets/${id}`);
  return data;
};

export default instance;
