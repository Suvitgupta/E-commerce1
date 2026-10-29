import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Search, Heart, User, MapPin, ShieldCheck, FileText, 
  Trash2, Plus, Minus, CheckCircle, Clock, Truck, AlertCircle, X, 
  Menu, ChevronRight, Star, Filter, ArrowRight, Tag, CreditCard, 
  Smartphone, DollarSign, Package, Check, RefreshCw, Eye, Edit3, 
  Settings, LogOut, Upload, Zap, Pill, Sparkles, Home, ChevronDown, 
  Activity, Award, Lock, ExternalLink, HelpCircle, Navigation, Layers
} from 'lucide-react';

// --- SEED DATA (25+ Products across 5 Super Categories) ---
const INITIAL_PRODUCTS = [
  // 1. Fresh Groceries 🍏
  {
    id: 'g1',
    name: 'Organic Alphonso Mangoes (6 pcs)',
    category: 'Groceries',
    subcategory: 'Fresh Fruits',
    price: 649,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80',
    stock: 25,
    unit: '1 Box (~1.2 kg)',
    rxRequired: false,
    express: true,
    seller: 'FreshFarm Direct',
    description: 'Naturally ripened, Handpicked Grade-A Ratnagiri Alphonso Mangoes. Sweet, aromatic, and pesticide-free.'
  },
  {
    id: 'g2',
    name: 'Farm Fresh Organic Whole Milk',
    category: 'Groceries',
    subcategory: 'Dairy & Bakery',
    price: 68,
    originalPrice: 75,
    rating: 4.7,
    reviewsCount: 1205,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80',
    stock: 100,
    unit: '1 Litre',
    rxRequired: false,
    express: true,
    seller: 'CountryDelight Store',
    description: 'Pure, unadulterated pasteurized whole milk delivered fresh from trusted dairy farms every morning.'
  },
  {
    id: 'g3',
    name: 'Whole Wheat Atta (Fortified)',
    category: 'Groceries',
    subcategory: 'Atta & Rice',
    price: 320,
    originalPrice: 380,
    rating: 4.6,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
    stock: 40,
    unit: '5 kg',
    rxRequired: false,
    express: false,
    seller: 'Aashirvaad Depot',
    description: '100% pure whole wheat flour processed with zero maida mixing. Packed with essential nutrients.'
  },
  {
    id: 'g4',
    name: 'Premium Basmati Rice (Aged 2 Yrs)',
    category: 'Groceries',
    subcategory: 'Atta & Rice',
    price: 780,
    originalPrice: 950,
    rating: 4.9,
    reviewsCount: 654,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
    stock: 18,
    unit: '5 kg',
    rxRequired: false,
    express: false,
    seller: 'Royal Grains',
    description: 'Extra long grain aromatic basmati rice aged naturally for superior fluffiness and non-sticky texture.'
  },
  {
    id: 'g5',
    name: 'Fresh Hydroponic Avocados',
    category: 'Groceries',
    subcategory: 'Fresh Vegetables',
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
    stock: 15,
    unit: '2 pcs (~350g)',
    rxRequired: false,
    express: true,
    seller: 'GreenGrown Farms',
    description: 'Rich, creamy Hass avocados cultivated in sterile hydroponic setups. Perfect for salads and toasts.'
  },

  // 2. OTC & Prescription Medicines 💊
  {
    id: 'm1',
    name: 'Amoxicillin & Potassium Clavulanate 625mg',
    category: 'Medicines',
    subcategory: 'Antibiotics',
    price: 185,
    originalPrice: 210,
    rating: 4.9,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    stock: 80,
    unit: 'Strip of 10 Tablets',
    rxRequired: true,
    express: true,
    seller: 'Apollo Pharmacy Partner',
    description: 'Broad-spectrum antibiotic used to treat bacterial infections of lungs, sinuses, and ear. REQUIRES VALID PRESCRIPTION.'
  },
  {
    id: 'm2',
    name: 'Dolo-650 Paracetamol Tablets',
    category: 'Medicines',
    subcategory: 'Pain Relief & Fever',
    price: 32,
    originalPrice: 35,
    rating: 4.9,
    reviewsCount: 5400,
    image: 'https://images.unsplash.com/photo-1550572017-edf792890473?w=500&auto=format&fit=crop&q=80',
    stock: 300,
    unit: 'Strip of 15 Tablets',
    rxRequired: false,
    express: true,
    seller: 'MedPlus Health',
    description: 'Trusted fever reducer and analgesic for mild-to-moderate fever, headache, and body ache relief.'
  },
  {
    id: 'm3',
    name: 'Metformin HCl ER 500mg (Glycomet)',
    category: 'Medicines',
    subcategory: 'Diabetes Care',
    price: 48,
    originalPrice: 58,
    rating: 4.8,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80',
    stock: 120,
    unit: 'Strip of 10 Tablets',
    rxRequired: true,
    express: true,
    seller: 'Netmeds Verified',
    description: 'Oral anti-diabetic medication used to control blood sugar levels in type-2 diabetes mellitus.'
  },
  {
    id: 'm4',
    name: 'Multivitamin with Zinc & Vitamin C',
    category: 'Medicines',
    subcategory: 'Wellness & Immunity',
    price: 340,
    originalPrice: 450,
    rating: 4.7,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=80',
    stock: 95,
    unit: '60 Capsules Bottle',
    rxRequired: false,
    express: true,
    seller: 'HealthKart Official',
    description: 'Daily essential immunity booster supplement enriched with Vitamin C, D3, Zinc, and Ginseng extract.'
  },
  {
    id: 'm5',
    name: 'Atorvastatin 10mg Tablets (Lipvas)',
    category: 'Medicines',
    subcategory: 'Cardiac Care',
    price: 110,
    originalPrice: 135,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=80',
    stock: 50,
    unit: 'Strip of 15 Tablets',
    rxRequired: true,
    express: false,
    seller: 'Cipla Wellness Hub',
    description: 'Lipid-lowering medication used to reduce cholesterol and lower risk of cardiovascular disease.'
  },

  // 3. Electronics 📱
  {
    id: 'e1',
    name: 'Noise Pulse 3 Smartwatch (1.96" Display)',
    category: 'Electronics',
    subcategory: 'Wearables',
    price: 1499,
    originalPrice: 4999,
    rating: 4.4,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    stock: 35,
    unit: '1 Unit',
    rxRequired: false,
    express: true,
    seller: 'TechWorld Retail',
    description: 'BT calling smartwatch with 100+ sports modes, SpO2 & Heart Rate monitoring, 7-day battery backup.'
  },
  {
    id: 'e2',
    name: 'TWS True Wireless Earbuds with ANC',
    category: 'Electronics',
    subcategory: 'Audio Devices',
    price: 2299,
    originalPrice: 3999,
    rating: 4.6,
    reviewsCount: 980,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
    stock: 20,
    unit: '1 Pair',
    rxRequired: false,
    express: true,
    seller: 'boAt Official Store',
    description: '30dB Active Noise Cancellation, quad mic ENx technology for crystal clear calls, 35hr total playback.'
  },
  {
    id: 'e3',
    name: 'Fast Charging 20,000mAh Power Bank',
    category: 'Electronics',
    subcategory: 'Mobile Accessories',
    price: 1699,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1609592807688-8aaf1130e527?w=500&auto=format&fit=crop&q=80',
    stock: 50,
    unit: '1 Unit',
    rxRequired: false,
    express: false,
    seller: 'Mi Authorized Dealer',
    description: '22.5W Ultra-fast charging with triple output ports (Type-C PD + dual USB-A). Aircraft safe certified.'
  },

  // 4. Personal Care 🧼
  {
    id: 'p1',
    name: 'Hydrating Gentle Foaming Face Wash',
    category: 'Personal Care',
    subcategory: 'Skincare',
    price: 349,
    originalPrice: 425,
    rating: 4.8,
    reviewsCount: 880,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    stock: 60,
    unit: '150 ml',
    rxRequired: false,
    express: true,
    seller: 'CeraVe / Loreal Hub',
    description: 'Formulated with Hyaluronic Acid & Ceramides. Maintains natural skin barrier without stripping moisture.'
  },
  {
    id: 'p2',
    name: 'Organic Onion Anti-Hairfall Shampoo',
    category: 'Personal Care',
    subcategory: 'Haircare',
    price: 499,
    originalPrice: 599,
    rating: 4.6,
    reviewsCount: 2300,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
    stock: 45,
    unit: '250 ml',
    rxRequired: false,
    express: true,
    seller: 'Mamaearth Direct',
    description: 'Reduces hair fall, strengthens roots, enriched with Plant Keratin and naturally sourced Red Onion Oil.'
  },

  // 5. Household Essentials 🧹
  {
    id: 'h1',
    name: 'Eco-Friendly Laundry Liquid Detergent',
    category: 'Household Essentials',
    subcategory: 'Cleaning Supplies',
    price: 420,
    originalPrice: 550,
    rating: 4.7,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80',
    stock: 50,
    unit: '2 Litre Bottle',
    rxRequired: false,
    express: true,
    seller: 'SurfExcel Direct',
    description: 'Plant-derived bio-enzyme formula. Tough on stains, soft on fabrics, and safe for front/top load machines.'
  },
  {
    id: 'h2',
    name: 'Antibacterial Surface Disinfectant Spray',
    category: 'Household Essentials',
    subcategory: 'Sanitizers & Spray',
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 1980,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&auto=format&fit=crop&q=80',
    stock: 150,
    unit: '500 ml',
    rxRequired: false,
    express: true,
    seller: 'Lysol India',
    description: 'Kills 99.9% of germs, bacteria, and viruses. Pleasant citrus fragrance for kitchen counters & door knobs.'
  }
];

// --- AVAILABLE COUPONS ---
const AVAILABLE_COUPONS = [
  { code: 'DAILY100', discount: 100, type: 'flat', minSpend: 500, desc: '₹100 Off on orders above ₹500' },
  { code: 'HEALTH20', discount: 20, type: 'percent', minSpend: 300, desc: '20% Off on Medicines & Healthcare' },
  { code: 'FREESHIP', discount: 49, type: 'flat', minSpend: 199, desc: 'Free Shipping (Saves ₹49)' }
];

// Product Card Sub-component
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onSelect }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group relative">
      <div>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <button 
            onClick={() => onToggleWishlist(product)}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-rose-500 shadow-sm transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          {product.rxRequired && (
            <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Pill className="w-3 h-3" /> Rx Req
            </span>
          )}
          {product.express && !product.rxRequired && (
            <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
              <Zap className="w-3 h-3 fill-white" /> 15 MIN
            </span>
          )}
        </div>

        <div className="p-3.5 space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.subcategory}</p>
          <h4 
            onClick={() => onSelect(product)} 
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-600 line-clamp-2 cursor-pointer transition-colors"
          >
            {product.name}
          </h4>
          <p className="text-[11px] text-slate-500">{product.unit}</p>
          
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold pt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-0 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // Persistence helpers
  const getInitialState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`dailyneeds_${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  // Main Application States
  const [products, setProducts] = useState(() => getInitialState('products', INITIAL_PRODUCTS));
  const [cart, setCart] = useState(() => getInitialState('cart', []));
  const [wishlist, setWishlist] = useState(() => getInitialState('wishlist', []));
  const [orders, setOrders] = useState(() => getInitialState('orders', []));
  const [prescriptions, setPrescriptions] = useState(() => getInitialState('prescriptions', []));
  const [savedAddresses, setSavedAddresses] = useState(() => getInitialState('addresses', [
    {
      id: 'addr_1',
      name: 'John Doe',
      type: 'Home',
      street: 'Flat 402, Green Valley Apartments, Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      phone: '+91 9876543210',
      isDefault: true
    }
  ]));

  // App UI & Navigation States
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'shop', 'cart', 'wishlist', 'orders', 'account', 'admin'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai (400050)');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Filters State
  const [priceRange, setPriceRange] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [expressOnly, setExpressOnly] = useState(false);
  const [rxOnly, setRxOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Prescription Upload Modal State
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [rxUploadData, setRxUploadData] = useState({
    patientName: '',
    doctorName: '',
    notes: '',
    filePreview: null
  });

  // Checkout State
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [activeOrderForTracking, setActiveOrderForTracking] = useState(null);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('dailyneeds_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dailyneeds_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dailyneeds_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dailyneeds_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('dailyneeds_products', JSON.stringify(products));
  }, [products]);

  // Show Toast
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, qty = 1) => {
    if (product.stock <= 0) {
      showToast('Product is out of stock!', 'error');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + qty;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'error');
          return prev;
        }
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.stock) {
            showToast(`Max available stock reached (${item.stock})`, 'error');
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast('Saved to Wishlist!');
        return [...prev, product];
      }
    });
  };

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'flat') return appliedCoupon.discount;
    if (appliedCoupon.type === 'percent') return Math.round((subtotal * appliedCoupon.discount) / 100);
    return 0;
  }, [subtotal, appliedCoupon]);

  const gstAmount = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + gstAmount);

  const hasRxItemInCart = useMemo(() => {
    return cart.some(item => item.rxRequired);
  }, [cart]);

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find(c => c.code === code);

    if (!found) {
      showToast('Invalid Coupon Code!', 'error');
      return;
    }

    if (subtotal < found.minSpend) {
      showToast(`Minimum order value for ${found.code} is ₹${found.minSpend}`, 'error');
      return;
    }

    setAppliedCoupon(found);
    setCouponInput('');
    showToast(`Coupon ${found.code} applied successfully!`);
  };

  const handleRxSubmit = (e) => {
    e.preventDefault();
    const newRx = {
      id: 'rx_' + Date.now(),
      patientName: rxUploadData.patientName || 'Default Patient',
      doctorName: rxUploadData.doctorName || 'Dr. Self Prescribed',
      notes: rxUploadData.notes,
      fileUrl: rxUploadData.filePreview || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
      status: 'Verified',
      uploadedAt: new Date().toLocaleString()
    };

    setPrescriptions(prev => [newRx, ...prev]);
    setIsRxModalOpen(false);
    setRxUploadData({ patientName: '', doctorName: '', notes: '', filePreview: null });
    showToast('Prescription uploaded & verified by Pharmacist!');
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === 'razorpay' && otpValue.length < 4) {
      showToast('Please enter a 4-digit OTP code to authorize payment', 'error');
      return;
    }

    const updatedProducts = products.map(prod => {
      const cartItem = cart.find(ci => ci.id === prod.id);
      if (cartItem) {
        return { ...prod, stock: Math.max(0, prod.stock - cartItem.quantity) };
      }
      return prod;
    });
    setProducts(updatedProducts);

    const selectedAddr = savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0];

    const newOrder = {
      id: 'DN-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      totalAmount: grandTotal,
      subtotal,
      discountAmount,
      deliveryFee,
      gstAmount,
      address: selectedAddr,
      paymentMethod: paymentMethod.toUpperCase(),
      paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'PAID',
      status: 'Placed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
      rxRequired: hasRxItemInCart,
      rxStatus: hasRxItemInCart ? 'Verified' : 'N/A'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutModalOpen(false);
    setOtpValue('');
    setActiveOrderForTracking(newOrder);
    setCurrentTab('orders');
    showToast('Order placed successfully!', 'success');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (activeCategory !== 'All' && product.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSub = product.subcategory.toLowerCase().includes(query);
        if (!matchName && !matchSub) return false;
      }
      if (product.price > priceRange) return false;
      if (product.rating < minRating) return false;
      if (expressOnly && !product.express) return false;
      if (rxOnly && !product.rxRequired) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [products, activeCategory, searchQuery, priceRange, minRating, expressOnly, rxOnly, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 md:pb-10 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white font-medium transition-all ${
          toastMessage.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Express 15-Min Delivery
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsRxModalOpen(true)} className="hover:text-emerald-400 flex items-center gap-1">
              <Pill className="w-3.5 h-3.5" /> Upload Rx
            </button>
            <button onClick={() => setCurrentTab('admin')} className="text-amber-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-4">
            <div 
              onClick={() => { setCurrentTab('home'); setActiveCategory('All'); }}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-md">
                DN
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-none">
                  Daily<span className="text-emerald-600">Needs</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Your SuperApp</p>
              </div>
            </div>

            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-700 truncate max-w-[120px]">{selectedLocation}</span>
            </button>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search products, groceries, medicines..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'shop') setCurrentTab('shop');
              }}
              className="w-full bg-slate-100 focus:bg-white text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('shop')}
              className={`p-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold ${
                currentTab === 'shop' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-700'
              }`}
            >
              <Layers className="w-5 h-5" /> Catalog
            </button>

            <button
              onClick={() => setCurrentTab('cart')}
              className="p-2.5 rounded-xl bg-emerald-600 text-white flex items-center gap-2 font-semibold shadow-md"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>₹{subtotal}</span>
              {cart.length > 0 && (
                <span className="bg-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px]">
              <h2 className="text-3xl font-extrabold">Groceries & Daily Essentials in 15 Minutes</h2>
              <button 
                onClick={() => setCurrentTab('shop')}
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl w-fit transition-all"
              >
                Start Shopping Now
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Trending Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.some(w => w.id === product.id)}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'shop' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6 h-fit">
              <h3 className="font-bold flex items-center gap-2"><Filter className="w-4 h-4 text-emerald-600" /> Filters</h3>
              <div>
                <label className="text-xs font-bold block mb-2">Max Price: ₹{priceRange}</label>
                <input 
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="50" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </aside>

            <div className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.some(w => w.id === product.id)}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'cart' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-emerald-600" /> Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-slate-500 text-sm py-8 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateCartQty(item.id, -1)} className="p-1 border rounded"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="p-1 border rounded"><Plus className="w-3.5 h-3.5" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:text-red-700 ml-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-2 text-sm border-t">
                  <div className="flex justify-between"><span>Subtotal:</span><span className="font-bold">₹{subtotal}</span></div>
                  <div className="flex justify-between"><span>Delivery:</span><span className="font-bold">₹{deliveryFee}</span></div>
                  <div className="flex justify-between text-lg font-black border-t pt-2"><span>Total:</span><span>₹{grandTotal}</span></div>
                </div>

                <button 
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === 'admin' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" /> Admin Control Panel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase">Total Inventory Items</p>
                <p className="text-2xl font-black text-emerald-700">{products.length}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase">Total Orders</p>
                <p className="text-2xl font-black text-blue-700">{orders.length}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase">Prescriptions Pending Review</p>
                <p className="text-2xl font-black text-amber-700">{prescriptions.length}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 relative shadow-2xl">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold">Complete Payment</h3>
            <p className="text-xs text-slate-500">Order Amount: <span className="font-bold text-slate-900">₹{grandTotal}</span></p>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold block">Payment Method</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-100 text-sm font-semibold p-2.5 rounded-xl border border-slate-200 outline-none"
              >
                <option value="razorpay">Razorpay Gateway (Card/UPI)</option>
                <option value="cod">Cash On Delivery (COD)</option>
              </select>

              {paymentMethod === 'razorpay' && (
                <div>
                  <label className="text-xs font-bold block mb-1">Enter OTP Authorization Code</label>
                  <input 
                    type="text" 
                    placeholder="1234" 
                    maxLength={4}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    className="w-full bg-slate-100 p-2.5 rounded-xl text-center font-bold tracking-widest text-lg border border-slate-200 outline-none"
                  />
                </div>
              )}

              <button 
                onClick={handleCompleteOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-4"
              >
                Confirm & Pay ₹{grandTotal}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Upload Modal */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleRxSubmit} className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 relative shadow-2xl">
            <button type="button" onClick={() => setIsRxModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold flex items-center gap-2"><Pill className="w-5 h-5 text-blue-600" /> Upload Doctor Prescription</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Patient Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  required
                  value={rxUploadData.patientName}
                  onChange={(e) => setRxUploadData({...rxUploadData, patientName: e.target.value})}
                  className="w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Doctor Name</label>
                <input 
                  type="text" 
                  placeholder="Dr. Smith"
                  required
                  value={rxUploadData.doctorName}
                  onChange={(e) => setRxUploadData({...rxUploadData, doctorName: e.target.value})}
                  className="w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-4"
              >
                Submit & Verify
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Sticky Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 flex items-center justify-around py-2 shadow-lg">
        <button 
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${currentTab === 'home' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <Home className="w-5 h-5" /> Home
        </button>
        <button 
          onClick={() => setCurrentTab('shop')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${currentTab === 'shop' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <Layers className="w-5 h-5" /> Catalog
        </button>
        <button 
          onClick={() => setCurrentTab('cart')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative ${currentTab === 'cart' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <ShoppingBag className="w-5 h-5" /> Cart
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
        <button 
          onClick={() => setCurrentTab('admin')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${currentTab === 'admin' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <ShieldCheck className="w-5 h-5" /> Admin
        </button>
      </div>
    </div>
  );
}