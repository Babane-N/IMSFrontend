// Customer Model
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: Date;
}

// Order Model
export interface Order {
  id: number;
  customer_id: number;
  order_date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  created_at: Date;
}

// Order Details Model
export interface OrderDetail {
  id: number;
  order_id: number;
  inventory_id: number;
  quantity: number;
  price: number;
}


// Supplier Model
export interface Supplier {
  id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  created_at: Date;
}

// Category Model
export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: Date;
}

// Promotion Model
export interface Promotion {
  id: number;
  code: string;
  description: string;
  discount_percentage: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

// Stock Movement Model
export interface StockMovement {
  id: number;
  inventory_id: number;
  movement_type: 'inbound' | 'outbound';
  quantity: number;
  movement_date: Date;
  reason: string;
}

// User Model
export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
}

// Log Model
export interface Log {
  id: number;
  action: string;
  user_id: number;
  timestamp: Date;
}
