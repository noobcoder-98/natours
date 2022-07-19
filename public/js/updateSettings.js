/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts'

/**
 * 
 * @param {*} data 
 * @param {*type is either 'password' or 'data'} type 
 */
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' 
    ? 'http://localhost:3000/api/v1/users/updatePassword' 
    : 'http://localhost:3000/api/v1/users/updateMe'
    const res = await axios({
      method: 'PATCH',
      url, 
      data
    })

    if (res.data.status === 'success') {
      showAlert('success', ` ${type.toUpperCase()} updated successfully`)
    }
  } catch (error) {
    showAlert('error', error.response.data.message)
  }
}