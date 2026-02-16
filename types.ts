
export enum AppMode {
  UPI = 'UPI',
  WATCH = 'WATCH',
  MERCHANT = 'MERCHANT'
}

export interface Transaction {
  id: string;
  amount: number;
  timestamp: number;
  type: 'CREDIT' | 'DEBIT';
  peer: string; // Merchant name or Phone number
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
}

export interface GlobalState {
  userWallet: {
    balance: number;
    phoneBalance: number;
    transactions: Transaction[]; // Synced/Phone history
    pendingSync: Transaction[];   // Local to Watch, not yet synced
    offlineCount: number;
    isActive: boolean;
    isAutoReloadEnabled: boolean;
    dailyLimit: number; // New: Daily spending limit
    dailySpent: number; // New: Amount spent today
    geoStatus: 'safe' | 'risk' | 'scanning'; // New: Geo-Compliance Status
    currentLocation: string; // New: Current Location Name
    phoneNumber: string; // New: Persisted Profile Phone
    isLinked: boolean;   // New: Persisted Profile Status
    geoPosition: { x: number; y: number }; // New: Persisted Map Position
    greenBalance: number; // New: Accumulated Emergency Fees
    treesPlanted: number; // New: Count of trees planted via fees
  };
  merchantWallet: {
    balance: number;
    bankBalance: number;
    transactions: Transaction[];
    isActive: boolean;
  };
  pendingPaymentRequest: {
    from: string;
    amount: number;
    timestamp: number;
  } | null;
  connectivity: {
    isBluetoothOn: boolean;
    isWifiOn: boolean;
  };
}
