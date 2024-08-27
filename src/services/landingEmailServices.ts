import axios from 'axios';
import { toast } from 'react-toastify';


const sendLandingEmail = async (data:any) => {
  const response = await axios.post('http://localhost:8000/send_landing_email', data);
toast.success("email envoyé avec succes")

  return response.data;
};

export default sendLandingEmail