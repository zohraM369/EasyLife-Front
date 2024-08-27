
import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL ='http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

interface User {
  email: string;
  password: string;
}

interface RegisterUser extends User {
  name: string;
}


const authService = {

sendResetPasswordEmail : async (userData:any) => {
  const response = await axios.post(`${API_URL}/auth/send_reset_email`, userData)
  console.log(response)
   if(response.data.err) {
  toast.error(response.data.err)
 }else {
  toast.success(response.data.msg)
 }
  return response
},

ResetPasswordHandler : async (userData:any)=> {
 const response = await axios.post(`${API_URL}/auth/reset_password`, userData)
 console.log(response)
   if(response.data.err) {
  toast.error(response.data.err)
 }else {
  toast.success(response.data.message)
 
 }
  return response
},

sendEmail :  async (userData:any) => {  
  // 100000 + 450000 ===> 550000
  const code = Math.floor(100000 + Math.random() * 900000).toString(); 
  const response = await axios.post(`${API_URL}/auth/sendEmail`, {email:userData,code:code})
  return response
  },

   verifyCode : async (userData:any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verifyCode`, userData);
    if (response.data.msg) {
      toast.success(response.data.msg);
      // Optionally update the user or handle successful verification
      return response
    } else {
      toast.error('Verification echoué');
    }
  } catch (error) {
    toast.error('Error during verification');
    console.error('Verification error:', error);
  }
},

  register: async (userData: RegisterUser) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
  
    return response.data;
  },

  login: async (userData: User) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    localStorage.setItem('token',response.data.user.token) 
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
    const response = await axios.put(`${API_URL}/auth/update_email`, {userId:userId,password:password,newEmail:newEmail});
    localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre email a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
  },
   updateCity:  async(userId:string,newCity:string,password:string) => {
    const response = await axios.put(`${API_URL}/auth/update_city`, {userId:userId,newCity:newCity,password:password});
    localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre Ville a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
},
  updatePassword : async(userId:string,oldPassword:string,newPassword:string) => {
    const response = await axios.put(`${API_URL}/auth/update_password`, {userId:userId,oldPassword:oldPassword,newPassword:newPassword});
   localStorage.setItem("user",JSON.stringify(response.data.user))
      toast.success("Votre mot de passe a été mis a jour avec succes")
      setTimeout(()=>{
        window.location.reload()
      },2500)
      return response.data.user;
  },
  updateName:  async(userId:string,newName:string,password:string) => {
    const response = await axios.put(`${API_URL}/auth/update_name`, {userId:userId,newName:newName,password:password});
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
      const response = await axios.put(`${API_URL}/auth/update_user_image`, formData, {
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
