import axios from "axios"

export const login = async (endpoint, email, password) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}${endpoint}`, {
      email,
      password
    })
    return response
  } catch (error) {
    return error
  }
}