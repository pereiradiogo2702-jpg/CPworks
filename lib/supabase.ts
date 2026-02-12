import { createClient } from '@supabase/supabase-js';

// Pour le moment, on utilise un stockage local (localStorage)
// Plus tard, tu pourras configurer Supabase avec tes vraies clés
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour notre base de données
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}
