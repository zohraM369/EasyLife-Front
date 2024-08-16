export interface Message {
  _id?: string;
  user_id: string;
  content: string;
  recipientId: string;
  created_at?: any;
  updated_at?: any;
}
