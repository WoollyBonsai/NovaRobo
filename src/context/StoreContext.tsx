'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ComponentItem,
  Order,
  CustomEnquiry,
  SupportTicket,
  INITIAL_ORDERS,
  INITIAL_ENQUIRIES,
  INITIAL_SUPPORT_TICKETS,
} from '../data/products';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  warranty: 'standard' | 'enterprise';
  warrantyCost: number;
  image: string;
  categoryLabel: string;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: Product | ComponentItem, quantity?: number, warranty?: 'standard' | 'enterprise') => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setWarranty: (id: string, warranty: 'standard' | 'enterprise') => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (shippingDetails: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    shippingMethod: string;
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Custom Enquiries
  enquiries: CustomEnquiry[];
  submitEnquiry: (data: Omit<CustomEnquiry, 'id' | 'status' | 'createdAt'>) => CustomEnquiry;
  approveEnquiry: (id: string, quote: number) => void;

  // Support
  supportTickets: SupportTicket[];
  createTicket: (subject: string, category: SupportTicket['category'], text: string) => SupportTicket;
  sendSupportMessage: (ticketId: string, text: string) => void;

  // Navigation & Modals
  activeSection: string;
  setActiveSection: (sec: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  isCartOpen: boolean;
  toggleCart: (open?: boolean) => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  isAccountOpen: boolean;
  accountTab: 'orders' | 'wishlist' | 'enquiries' | 'profile';
  openAccount: (tab?: 'orders' | 'wishlist' | 'enquiries' | 'profile') => void;
  closeAccount: () => void;

  isCustomProjectOpen: boolean;
  openCustomProject: () => void;
  closeCustomProject: () => void;

  isSupportOpen: boolean;
  openSupport: () => void;
  closeSupport: () => void;

  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('novarobo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['nr-k6-pro'];
    try {
      const saved = localStorage.getItem('novarobo_wishlist');
      return saved ? JSON.parse(saved) : ['nr-k6-pro'];
    } catch {
      return ['nr-k6-pro'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    try {
      const saved = localStorage.getItem('novarobo_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [enquiries, setEnquiries] = useState<CustomEnquiry[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ENQUIRIES;
    try {
      const saved = localStorage.getItem('novarobo_enquiries');
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);

  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState<'orders' | 'wishlist' | 'enquiries' | 'profile'>('orders');
  const [isCustomProjectOpen, setIsCustomProjectOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('novarobo_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('novarobo_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('novarobo_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('novarobo_enquiries', JSON.stringify(enquiries));
    } catch {}
  }, [enquiries]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (
    item: Product | ComponentItem,
    quantity: number = 1,
    warranty: 'standard' | 'enterprise' = 'standard'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      const warrantyCost = warranty === 'enterprise' ? Math.round(item.price * 0.15) : 0;
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          warranty,
          warrantyCost,
          image: item.image,
          categoryLabel: item.categoryLabel,
        },
      ];
    });
    showToast(`Added "${item.name}" to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const setWarranty = (id: string, warranty: 'standard' | 'enterprise') => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const warrantyCost = warranty === 'enterprise' ? Math.round(i.price * 0.15) : 0;
          return { ...i, warranty, warrantyCost };
        }
        return i;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price + item.warrantyCost) * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.08);
  const cartShipping = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 120;
  const cartTotal = cartSubtotal + cartTax + cartShipping;

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from saved items');
        return prev.filter((i) => i !== id);
      }
      showToast('Saved to your lab wishlist');
      return [...prev, id];
    });
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const placeOrder = (shippingDetails: {
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    shippingMethod: string;
    paymentMethod: string;
  }) => {
    const timestamp = Date.now().toString();
    const orderId = `NR-ORD-${timestamp.slice(-4)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString().split('T')[0],
      items: cart.map((c) => ({
        id: c.id,
        name: c.name,
        price: c.price + c.warrantyCost,
        quantity: c.quantity,
        warranty: c.warranty === 'enterprise' ? 'Enterprise 3-Year Protection' : 'Standard 1-Year',
      })),
      total: cartTotal,
      status: 'SMT Assembly',
      statusProgress: 25,
      shippingAddress: `${shippingDetails.organization ? shippingDetails.organization + ', ' : ''}${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.postalCode}, ${shippingDetails.country}`,
      trackingNumber: `NVB-${timestamp.slice(-8)}`,
      carrier: shippingDetails.shippingMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${orderId} placed successfully!`);
    openAccount('orders');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const progressMap: Record<Order['status'], number> = {
      Fabrication: 15,
      'SMT Assembly': 35,
      'CNC Milling': 55,
      'QA & Calibration': 80,
      Dispatched: 92,
      Delivered: 100,
    };
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status, statusProgress: progressMap[status] } : ord))
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const submitEnquiry = (data: Omit<CustomEnquiry, 'id' | 'status' | 'createdAt'>) => {
    const timestamp = Date.now().toString();
    const newId = `NR-REQ-2026-${timestamp.slice(-3)}`;
    const newEnquiry: CustomEnquiry = {
      ...data,
      id: newId,
      status: 'Under Review',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedQuote: 14500,
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    setIsCustomProjectOpen(false);
    showToast(`Enquiry ${newId} submitted. Engineering SLA: 24h`);
    openAccount('enquiries');
    return newEnquiry;
  };

  const approveEnquiry = (id: string, quote: number) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'Quotation Ready', estimatedQuote: quote } : e))
    );
    showToast(`Quotation approved for ${id}`);
  };

  const createTicket = (subject: string, category: SupportTicket['category'], text: string) => {
    const timestamp = Date.now().toString();
    const ticketId = `TICK-${timestamp.slice(-3)}`;
    const newTicket: SupportTicket = {
      id: ticketId,
      subject,
      category,
      status: 'Engineering Assigned',
      lastUpdated: 'Just now',
      messages: [
        {
          sender: 'customer',
          authorName: 'You (Lab Lead)',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text,
        },
        {
          sender: 'engineer',
          authorName: 'Dr. Aris Thorne (Chief Kinematics Architect)',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Ticket logged under ${category}. Our engineering team has assigned a hardware specialist to analyze your query.`,
        },
      ],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket ${ticketId} created`);
    return newTicket;
  };

  const sendSupportMessage = (ticketId: string, text: string) => {
    const userMsg = {
      sender: 'customer' as const,
      authorName: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setSupportTickets((prev) =>
      prev.map((tick) => {
        if (tick.id === ticketId) {
          return {
            ...tick,
            lastUpdated: 'Just now',
            messages: [...tick.messages, userMsg],
          };
        }
        return tick;
      })
    );

    setTimeout(() => {
      const engReply = {
        sender: 'engineer' as const,
        authorName: 'Sarah Lin (Senior Embedded Systems Engineer)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Telemetry review complete. We suggest checking CAN-FD termination resistance (120Ω ± 1%) across lines CAN_H and CAN_L, and verifying your power rail voltage is holding stable above 23.5V during high acceleration.',
      };
      setSupportTickets((prev) =>
        prev.map((tick) => (tick.id === ticketId ? { ...tick, messages: [...tick.messages, engReply] } : tick))
      );
    }, 2500);
  };

  const toggleCart = (open?: boolean) => setIsCartOpen((prev) => (open !== undefined ? open : !prev));
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openAccount = (tab: 'orders' | 'wishlist' | 'enquiries' | 'profile' = 'orders') => {
    setAccountTab(tab);
    setIsAccountOpen(true);
  };
  const closeAccount = () => setIsAccountOpen(false);

  const openCustomProject = () => setIsCustomProjectOpen(true);
  const closeCustomProject = () => setIsCustomProjectOpen(false);

  const openSupport = () => setIsSupportOpen(true);
  const closeSupport = () => setIsSupportOpen(false);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  const openProductDetail = (product: Product) => setSelectedProduct(product);
  const closeProductDetail = () => setSelectedProduct(null);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setWarranty,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        placeOrder,
        updateOrderStatus,

        enquiries,
        submitEnquiry,
        approveEnquiry,

        supportTickets,
        createTicket,
        sendSupportMessage,

        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,

        selectedProduct,
        openProductDetail,
        closeProductDetail,

        isCartOpen,
        toggleCart,

        isCheckoutOpen,
        openCheckout,
        closeCheckout,

        isAccountOpen,
        accountTab,
        openAccount,
        closeAccount,

        isCustomProjectOpen,
        openCustomProject,
        closeCustomProject,

        isSupportOpen,
        openSupport,
        closeSupport,

        isAdminOpen,
        openAdmin,
        closeAdmin,

        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-card border border-accent/40 text-foreground px-5 py-3 rounded-xl shadow-glow-md backdrop-blur-md animate-fade-in text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
