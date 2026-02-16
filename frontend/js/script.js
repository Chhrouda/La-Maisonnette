/* =====================
   CONFIG
===================== */
const API_URL = "https://la-maisonnette.onrender.com";

/* =====================
   SAFE STORAGE HELPERS
===================== */
function safeGet(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
function safeSetRaw(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}
function safeGetRaw(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch { return fallback; }
}

/* =====================
   CART STATE
===================== */
let cart = safeGet("cart", []);

/* =====================
   TRANSLATIONS
===================== */
const translations = {
  en: {
    // NAV
    home: "Home",
    products: "Our crafted food",
    cart: "Cart",
    contact: "Contact",
    price_12: "TND 12",
    price_6: "TND 6",
    price_15: "TND 15",


    add_to_cart: "Add to Cart",
    see_details: "See Details",

    // PAGE TITLES
    site_title: "La Maisonnette", // use this only if you set <title data-i18n="site_title">
    home_title: "Simple, honest, beautifully crafted food — made with love from our home to yours.",
    home_sub: "Artisanal Tunisian flavors prepared with care, tradition, and family passion.",
    explore: "Explore our crafted food",


// Product names
    harissa_name: "Traditional Harissa Arbi 300g",
    barquette_name: "Homemade tartlet – 12 pieces",
    feuilletee_name: "Fresh Puff Pastry 1kg",

    // Product descriptions
    harissa_desc:
      "Artisanal Harissa Arbi, handcrafted from a family recipe for a rich, authentic flavor. Perfect for elevating Tunisian dishes.",
    barquette_desc:
      "Fresh homemade tartlet, hand‑crafted for a light, crisp texture and authentic taste. Ideal to complement your meals.",
    feuilletee_desc:
      "Artisanal puff pastry made with butter, delivering light, crisp layers and delicious flavor. Perfect for sweet and savory recipes.",

    

    harissa_desc:
      "Artisanal Arbi Harissa handmade using a family recipe.",
    barquette_desc:
      "Fresh homemade barquette pastry, handcrafted daily.",
    feuilletee_desc:
          "Fresh artisanal puff pastry made with butter.",

    products_title: "Our crafted food",
    cart_title: "Your Cart",
    checkout_title: "Checkout",
    contact_title: "Contact Us",
    contact_sub: "Have feedback or questions? We’d love to hear from you.",

    product_default_desc: "Handmade product crafted by La Maisonnette.",

    remove: "Remove",
    empty_cart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    pay_cod: "Pay on Delivery",
    pay_card: "Pay with Card",
    trust_text: "Payment on delivery · 24–72h delivery in Tunisia · WhatsApp support",

    full_name: "Full Name",
    email: "Email",
    address: "Address",

    fast_delivery: "Fast Home Delivery",
    secure_payments: "Secure & Easy Payment",
    tunisian_store: "Authentic Tunisian Recipes",
    verified_products: "Handmade & Verified Quality",

    details_page_title: "Details Page",
    ask_on_whatsapp: "Ask on WhatsApp",
    trust_line: "24–72h · Tunisia · Pay on delivery",

    // WHY
    why_title: "Why choose La Maisonnette?",
    why_curated_title: "Homemade Quality",
    why_curated_text: "Every product is handcrafted using traditional Tunisian recipes and premium ingredients.",
    why_local_title: "Authentic & Local",
    why_local_text: "Made in Sidi Bou Said with the warmth, love, and care of family cooking.",
    why_secure_title: "Fresh & Trusted",
    why_secure_text: "We prepare our harissa, barket, and pastry fresh, ensuring taste, safety, and quality.",

    // FORMS
    feedback: "Feedback",
    send_feedback: "Send Feedback",
    whatsapp_hint: "Or contact us directly on WhatsApp",
    fill_required: "Please fill all required fields"
  },

  fr: {
    home: "Accueil",
    products: "Nos délices artisanaux",
    cart: "Panier",
    contact: "Contact",
    price_12: "12 TND",
    price_: "6 TND",
    price_15: "15 TND",

    add_to_cart: "Ajouter au panier",
    see_details: "Voir les détails",

    site_title: "La Maisonnette",
    home_title: "Simple, honnête et artisanal — de notre maison à la vôtre.",
    home_sub: "Saveurs tunisiennes artisanales, préparées avec soin, tradition et passion familiale.",
    explore: "Découvrir nos délices",

    products_title: "Nos délices artisanaux",
    cart_title: "Votre panier",
    checkout_title: "Paiement",
    contact_title: "Contactez‑nous",
    contact_sub: "Vous avez des questions ou des remarques ? Nous serions ravis de vous répondre.",

// Product names
    harissa_name: "Harissa Arbi Traditionnelle 300g",
    barquette_name: "Barquette faite maison 12 pièces",
    feuilletee_name: "Pâte Feuilletée Fraîche 1kg",

    // Product descriptions
    harissa_desc:
      "Harissa Arbi artisanale préparée à la main selon une recette familiale, offrant une intensité savoureuse et un caractère authentique. Parfaite pour relever les plats tunisiens.",
    barquette_desc:
      "Barquette fraîche faite maison, travaillée à la main pour un croustillant léger et une saveur authentique. Idéale pour accompagner vos repas.",
    feuilletee_desc:
      "Pâte feuilletée artisanale préparée avec du beurre, offrant un feuilletage léger, croustillant et savoureux. Parfaite pour les préparations sucrées et salées.",

    product_default_desc: "Produit fait main par La Maisonnette.",

    remove: "Supprimer",
    empty_cart: "Votre panier est vide",
    total: "Total",
    checkout: "Paiement",
    pay_cod: "Paiement à la livraison",
    pay_card: "Payer par carte",
    trust_text: "Paiement à la livraison · Livraison 24–72h en Tunisie · Support WhatsApp",

    full_name: "Nom complet",
    email: "Email",
    address: "Adresse",

    fast_delivery: "Livraison à domicile rapide",
    secure_payments: "Paiement simple & sécurisé",
    tunisian_store: "Recettes tunisiennes authentiques",
    verified_products: "Fait main & qualité vérifiée",

    details_page_title: "Détails du produit",
    ask_on_whatsapp: "Demander sur WhatsApp",
    trust_line: "24–72h · Tunisie · Paiement à la livraison",

    why_title: "Pourquoi choisir La Maisonnette ?",
    why_curated_title: "Qualité fait‑maison",
    why_curated_text: "Chaque produit est façonné à la main selon des recettes tunisiennes et des ingrédients de qualité.",
    why_local_title: "Authentique & Local",
    why_local_text: "Préparé à Sidi Bou Said avec la chaleur et l’amour de la cuisine familiale.",
    why_secure_title: "Frais & Fiable",
    why_secure_text: "Harissa, barket et pâte feuilletée préparées fraîches pour un goût et une sécurité irréprochables.",

    feedback: "Avis",
    send_feedback: "Envoyer",
    whatsapp_hint: "Ou contactez‑nous directement sur WhatsApp",
    fill_required: "Veuillez remplir tous les champs requis"
  },

  tn: {
    home: "الرئيسية",
    products: "مأكولاتنا اليدوية",
    cart: "القفة",
    contact: "إتصل بينا",
    
harissa_desc:
      "هريسة عربية حرفية محضّرة يدويًا وفق وصفة عائلية، بنكهة أصيلة ومتوازنة. مثالية لإضفاء نكهة مميزة على الأطباق التونسية.",
    barquette_desc:
      "باركيت طازجة منزلية، مصنوعة يدويًا لقوام مقرمش وخفيف وطعم أصيل. مثالية لمرافقة وجباتكم.",
    feuilletee_desc:
      "عجينة مورقة حرفية مصنوعة بالزبدة لطبقات خفيفة ومقرمشة ومذاق لذيذ. مثالية للوصفات المالحة والحلوة.",

// Product names
    harissa_name: "هريسة عربي تقليدية 300غ",
    barquette_name: "باركيت منزلية – 12 قطعة",
    feuilletee_name: "عجينة مورقة طازجة 1كغ",


    add_to_cart: "زيد للسلة",
    see_details: "شوف التفاصيل",

    site_title: "La Maisonnette",
    home_title: "ماكلة بسيطة وبنينة معمولة بحب — من دارنا لداركم.",
    home_sub: "نكهات تونسية معمولة بيدينا وبوصفات عريقة وروح العايلة.",
    explore: "إكتشف المأكولات",
    price_12: "12 د",
    price_6: "6 د",
    price_15: "15 د",

    products_title: "مأكولاتنا اليدوية",
    cart_title: "القفة متاعك",
    checkout_title: "الخلاص",
    contact_title: "إتصل بينا",
    contact_sub: "عندك سؤال ولا ملاحظة؟ يسعدنا نجاوبوك.",

    product_default_desc: "منتج يدوي من La Maisonnette.",

    remove: "نحّي",
    cart: "القفة",
    empty_cart: "القفة فارغة",
    total: "المجموع",
    checkout: "الخلاص",
    pay_cod: "خلاص عند التسليم",
    pay_card: "خلاص بالكارطة",
    trust_text: "الخلاص عند التسليم · التوصيل 24–72 ساعة · واتساب",

    full_name: "الإسم الكامل",
    email: "الإيميل",
    address: "العنوان",

    fast_delivery: "توصيل ديار سريع",
    secure_payments: "خلاص ساهل ومضمون",
    tunisian_store: "وصفات تونسية أصيلة",
    verified_products: "صنعة يد وكاليتي",

    details_page_title: "تفاصيل المنتج",
    ask_on_whatsapp: "أسأل على واتساب",
    trust_line: "24–72h · تونس · خلاص عند التسليم",

    why_title: "علاش تختار La Maisonnette؟",
    why_curated_title: "كاليتي ديار",
    why_curated_text: "كل منتج معمول بيدينا وبوصفات تونسية ومكونات مضمونة.",
    why_local_title: "محلي وأصيل",
    why_local_text: "محضّر في سيدي بوسعيد بدفا العايلة وحبّ الطبخ.",
    why_secure_title: "طازج ومضمون",
    why_secure_text: "الهريسة والبركيت والعجينة مورّقة نطيبوهم فراش باش يجي الذوق واضح والكاليتي مضمونة.",

    feedback: "ملاحظة",
    send_feedback: "إبعث",
    whatsapp_hint: "ولا تنجم تكلمنا ديغري على واتساب",
    fill_required: "عبي كل الخانات الضرورية"
  }
};

/* =====================
   LANGUAGE STRATEGY (SEO-SAFE)
===================== */
function getInitialLang() {
  const stored = safeGetRaw("lang", null);
  if (stored && translations[stored]) return stored;
  const docLang = (document.documentElement.getAttribute("lang") || "en");
  return translations[docLang] ? docLang : "en";
}

/* =====================
   HELPERS
===================== */
function saveCart() { safeSet("cart", cart); }

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount, #floatingCount").forEach(el => {
    if (el) el.textContent = String(count);
  });
}
function clearCart() {
  cart = [];
  try { localStorage.removeItem("cart"); } catch {}
  updateCartCount();
  renderCart();
}

/* =====================
   CART ACTIONS
===================== */
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  saveCart();
  updateCartCount();
}

function removeOne(name) {
  const item = cart.find(p => p.name === name);
  if (!item) return;

  item.quantity--;
  if (item.quantity <= 0) {
    cart = cart.filter(p => p.name !== name);
  }

  saveCart();
  renderCart();
  updateCartCount();
}

/* =====================
   RENDER CART
===================== */
function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container || !totalEl) return;

  const lang = getInitialLang();
  const t = translations[lang] || translations.en;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p>${t.empty_cart}</p>`;
    totalEl.textContent = "0.00";
    return;
  }

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <strong>${item.name} x${item.quantity}</strong>
      <span>${lineTotal.toFixed(2)} TND</span>
      <button class="remove-btn" type="button">${t.remove}</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeOne(item.name);
    });

    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

/* =====================
   WHATSAPP COD
===================== */
function checkoutCOD() {
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;

  if (cart.length === 0) {
    alert(t.empty_cart);
    return;
  }

  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const name = (form.name?.value || "").trim();
  const email = (form.email?.value || "").trim();
  const address = (form.address?.value || "").trim();

  if (!name || !email || !address) {
    alert(t.fill_required || "Please fill all required fields");
    return;
  }

  let message = "Nouvelle commande:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    message += `• ${item.name} x${item.quantity} = ${lineTotal} TND%0A`;
  });

  message += `%0A💰 Total: ${total} TND`;
  message += `%0A📍 Paiement à la livraison`;
  message += `%0A👤 ${name}`;
  message += `%0A📧 ${email}`;
  message += `%0A🏠 ${address}`;

  window.open(`https://wa.me/21620342004?text=${message}`, "_blank");

  clearCart();
}

/* =====================
   INVOICE (overlay)
===================== */
function generateInvoice(customer) {
  const orderNumber = "LM-" + Date.now();
  const date = new Date().toLocaleDateString("fr-TN");

  const byId = id => document.getElementById(id);

  byId("invOrder") && (byId("invOrder").textContent = orderNumber);
  byId("invDate") && (byId("invDate").textContent = date);

  byId("invName") && (byId("invName").textContent = customer.name);
  byId("invEmail") && (byId("invEmail").textContent = customer.email);
  byId("invAddress") && (byId("invAddress").textContent = customer.address);

  const itemsBox = byId("invItems");
  if (itemsBox) {
    itemsBox.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const line = document.createElement("p");
      const lineTotal = item.price * item.quantity;
      total += lineTotal;
      line.textContent = `${item.name} x${item.quantity} — ${lineTotal} TND`;
      itemsBox.appendChild(line);
    });

    byId("invTotal") && (byId("invTotal").textContent = total.toFixed(2));
  }

  const panel = byId("invoicePanel");
  if (panel && panel.classList) panel.classList.add("active");
}

/* =====================
   CONTACT FORM
===================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("input[type=text]")?.value.trim() || "";
    const email = form.querySelector("input[type=email]")?.value.trim() || "";
    const msg = form.querySelector("textarea")?.value.trim() || "";

    if (!name || !email || !msg) return;

    const text = `📩 New Message\n\n👤 ${name}\n📧 ${email}\n\n💬 ${msg}`;
    window.open(
      `https://wa.me/21620342004?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    form.reset();
  });
}

/* =====================
   TRANSLATION ENGINE (Progressive Enhancement)
===================== */
function applyTranslation() {
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;

  // Update <title> ONLY if it's explicitly using the site_title key
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl && titleEl.dataset.i18n === "site_title" && t[titleEl.dataset.i18n]) {
    titleEl.textContent = t[titleEl.dataset.i18n];
  }

  // Update all other elements that declare data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    // Skip the <title> unless it's site_title (handled above)
    if (el.tagName === "TITLE") return;

    const key = el.dataset.i18n;
    if (key && t[key]) {
      const attr = el.dataset.i18nAttr;
      if (attr) {
        el.setAttribute(attr, t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });
}

/* =====================
   LANGUAGE SWITCHER
===================== */
function initLanguageSwitcher() {
  const currentLang = getInitialLang();

  document.querySelectorAll(".lang-change").forEach(btn => {
    const btnLang = btn.dataset.lang;

    if (btnLang === currentLang) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "true");
    }

    btn.addEventListener("click", () => {
      if (!btnLang || !translations[btnLang]) return;

      safeSetRaw("lang", btnLang);
      // Simple reload to apply JS translations
      location.reload();
    });
  });
}

/* =====================
   INIT
===================== */
/* =====================
   DOM READY
===================== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  applyTranslation();
  initContactForm();
  initLanguageSwitcher();

  const payBtn = document.getElementById("payBtn");
  if (payBtn) {
    payBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("💳 Card payment is not available yet.\nPlease choose Pay on Delivery.");
    });
  }

  document.querySelectorAll(".addToCart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      if (!product) return;

      addToCart(
        product.dataset.name,
        Number(product.dataset.price)
      );
    });
  });

  const codBtn = document.getElementById("codBtn");
  if (codBtn) {
    codBtn.addEventListener("click", checkoutCOD);
  }
});

/* =====================
   PRODUCT DETAILS MODAL
===================== */
(function initProductModal() {
  const modal      = document.getElementById('productModal');
  if (!modal) return;

  const mainImg    = document.getElementById('mMainImg');
  const thumbsWrap = document.getElementById('mThumbs');
  const nameEl     = document.getElementById('mName');
  const priceEl    = document.getElementById('mPrice');
  const descEl     = document.getElementById('mDesc');
  const addBtn     = document.getElementById('mAddToCart');
  const waLink     = document.getElementById('mWA');

  let currentProduct = null;
  let lastFocused = null;

  function openModal(prod) {
    currentProduct = prod;
    lastFocused = document.activeElement;

    // Fill content
    nameEl.textContent = tKey(prod.name);

    if (prod.priceValue != null && !Number.isNaN(prod.priceValue)) {
      priceEl.textContent = `${prod.priceValue} TND`;
    } else {
      priceEl.textContent = prod.price; // already includes currency text
    }

    descEl.textContent = tKey(prod.desc) || tKey('product_default_desc');

    const images = Array.isArray(prod.images) && prod.images.length
      ? prod.images
      : [prod.image, prod.image, prod.image].filter(Boolean);

    // Main image
    if (images[0]) {
      mainImg.src = images[0];
      mainImg.alt = prod.name;
    }

    // Thumbs
    thumbsWrap.innerHTML = '';
    images.forEach((src, i) => {
      const im = new Image();
      im.src = src;
      im.className = i === 0 ? 'active' : '';
      im.loading = 'lazy';
      im.tabIndex = 0; // keyboard focus
      im.addEventListener('click', () => selectThumb(i, src, im));
      im.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          selectThumb(i, src, im);
        }
      });
      thumbsWrap.appendChild(im);
    });

    function selectThumb(index, src, el) {
      document.querySelectorAll('#mThumbs img').forEach(t => t.classList.remove('active'));
      el.classList.add('active');

      mainImg.classList.remove('fading-in');
      mainImg.classList.add('fading-out');

      setTimeout(() => {
        mainImg.src = src;

        if (mainImg.complete) {
          mainImg.classList.remove('fading-out');
          mainImg.classList.add('fading-in');
        } else {
          mainImg.onload = () => {
            mainImg.classList.remove('fading-out');
            mainImg.classList.add('fading-in');
          };
        }
      }, 80);
    }

    // WhatsApp link (keeps price pretty and up-to-date)
    const priceText = (prod.priceValue != null ? `${prod.priceValue} TND` : prod.price);
    const waText = `🛒 Product inquiry\n\n📦 ${prod.name}\n💰 ${priceText}`;
    waLink.href = `https://wa.me/21620342004?text=${encodeURIComponent(waText)}`;

    // Add to Cart (close after adding)
    if (addBtn) {
      addBtn.onclick = () => {
        const numericPrice = (prod.priceValue != null)
          ? Number(prod.priceValue)
          : Number(String(prod.price).replace(/\D+/g, ''));
        addToCart(prod.name, numericPrice);
        closeModal();
      };
    }

    // Open
    modal.classList.add('open');
    document.body.classList.add('modal-open');

    // Accessibility focus
    setTimeout(() => {
      modal.querySelector('.modal-close')?.focus();
    }, 0);

    // Close on Esc
    document.addEventListener('keydown', onEsc);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function onEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  // Delegate clicks on See Details buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.see-details-btn, .seeDetails, .see-details');
    if (!btn) return;

    e.preventDefault();

    const card = btn.closest('.product');
    if (!card) return;

    // Build product data from card
    const imgEl = card.querySelector('img');
    const name = (card.dataset.name || card.querySelector('h3')?.textContent || '').trim();
    const priceValue = card.dataset.price ? Number(card.dataset.price) : null;
    const priceText  = card.querySelector('p')?.textContent?.trim()
                    || (priceValue != null ? `${priceValue} TND` : '');

    const image = imgEl?.src || card.dataset.image || '';

    if (!name || !priceText || !image) {
      console.warn('❌ Product structure/data missing');
      return;
    }
    
let images = [];
if (card.dataset.images) {
  images = card.dataset.images
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

if (images.length === 0) {
  images = [image];
}
    const prod = {
      name,
      price: priceText,
      priceValue,
      image,
      images: [image],
      desc: (card.dataset.desc && card.dataset.desc.trim()) || tKey('product_default_desc')
    };

    openModal(prod);
  });

  // Close handlers
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) closeModal();
  });
})();

function tKey(key) {
  const lang = getInitialLang();
  const t = translations[lang] || translations.en;
  return t[key] || translations.en[key] || key;
}