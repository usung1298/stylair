export interface OutfitItem {
  name: string;
  emoji: string;
  price: string;
}

export interface Outfit {
  id: number;
  emoji: string;
  image: string;
  title: string;
  brand: string;
  price: string;
  season: string;
  style: string;
  tags: string[];
  desc: string;
  items: OutfitItem[];
}

export interface User {
  name: string;
  email: string;
  preferredStyles: string[];
}

export interface CartItem {
  id: string;
  outfitId: number;
  outfitTitle: string;
  name: string;
  emoji: string;
  price: string;
}

export interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  likedOutfits: number[];
  toggleLike: (id: number) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  showToast: (msg: string) => void;
}