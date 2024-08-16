
import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL ='http://localhost:8000';

interface User {
  email: string;
  password: string;
}

interface RegisterUser extends User {
  name: string;
}



const authService = {
  register: async (userData: RegisterUser) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
  
    console.log(response.data)
    return response.data;
  },

  login: async (userData: User) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.clear();
    return {msg : "vous etes deconnecté"}
   
  },
 getCurrentUser: () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
  updateEmail : async(userId:string,newEmail:string,password:string) => {
    const response = await axios.post(`${API_URL}/auth/update_email`, {userId:userId,password:password,newEmail:newEmail});
    localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre email a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
  },
   updateCity:  async(userId:string,newCity:string,password:string) => {
    const response = await axios.post(`${API_URL}/auth/update_city`, {userId:userId,newCity:newCity,password:password});
    localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre Ville a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
},
  updatePassword : async(userId:string,oldPassword:string,newPassword:string) => {
    const response = await axios.post(`${API_URL}/auth/update_password`, {userId:userId,oldPassword:oldPassword,newPassword:newPassword});
   localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre mot de passe a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
  },
  updateName:  async(userId:string,newName:string,password:string) => {
    const response = await axios.post(`${API_URL}/auth/update_name`, {userId:userId,newName:newName,password:password});
    localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre nom d'utilisateur a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
},
updateImage: async (user_id: string, profileImage: Blob) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('user_id', user_id);
    try {
      const response = await axios.post(`${API_URL}/auth/update_user_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre image a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
    } catch (error) {
      console.error('Error uploading image', error);
      throw error;  // Rethrow error to handle it in the calling code
    }
  },
  delete_user : async (user_id:string) => {
     const response = await axios.delete(`${API_URL}/auth/delete_user/${user_id}`);
       return response.data;
  }
}

export default authService;
