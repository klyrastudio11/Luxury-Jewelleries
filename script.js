// Supabase configuration
const SUPABASE_URL = 'https://forizjrhqwbssigqzsrs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcml6anJocXdic3NpZ3F6c3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzI2NDcsImV4cCI6MjA5ODMwODY0N30.0B1ocn5BRSWcDKq00Xp8k_iYxETUyB5byI8dNC9bPEI';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseJsClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Simple Supabase client
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }

  async request(method, table, options = {}) {
    const endpoint = `${this.url}/rest/v1/${table}`;
    const headers = {
      'Authorization': `Bearer ${this.key}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': this.key,
    };
    if (options.prefer) {
      headers['Prefer'] = options.prefer;
    }

    const config = {
      method,
      headers,
      cache: 'no-store'
    };
    if (options.body !== undefined) {
      config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }

    const response = await fetch(endpoint, config);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase error: ${response.statusText} - ${errorText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  _buildQuery(options = {}) {
    let query = '';
    if (options.select) {
      query += `?select=${encodeURIComponent(options.select)}`;
    }
    if (options.eq) {
      Object.entries(options.eq).forEach(([key, value]) => {
        query += query ? '&' : '?';
        query += `${encodeURIComponent(key)}=eq.${encodeURIComponent(value)}`;
      });
    }
    return query;
  }

  async insert(table, data) {
    return this.request('POST', table, { body: JSON.stringify(data) });
  }

  async update(table, data, options = {}) {
    const query = this._buildQuery(options);
    return this.request('PATCH', `${table}${query}`, { body: JSON.stringify(data), prefer: 'return=representation' });
  }

  async select(table, options = {}) {
    const query = this._buildQuery(options);
    return this.request('GET', `${table}${query}`);
  }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const cart = [];
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const orderMessage = document.getElementById('orderMessage');
const checkoutForm = document.getElementById('checkoutForm');
const heroPanel = document.getElementById('heroPanel');
const cartToggle = document.getElementById('cartToggle');
const userOrdersForm = document.getElementById('userOrdersForm');
const userOrderMessage = document.getElementById('userOrderMessage');
const userOrdersList = document.getElementById('userOrdersList');
const adminOrdersList = document.getElementById('adminOrdersList');

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(value) {
  if (!value) return 'Within 1 Week';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Within 1 week';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const DEFAULT_ORDER_STATUS = 'Confirmed';
const ADMIN_PASSWORD = 'Klyra@11';
let isAdminAuthenticated = false;

function formatOrderStatus() {
  return DEFAULT_ORDER_STATUS;
}

function statusClass() {
  return DEFAULT_ORDER_STATUS.toLowerCase();
}

function deliveryDaysFromEstimate(estimatedDate) {
  if (!estimatedDate) return 7;
  const now = new Date();
  const then = new Date(estimatedDate);
  const diffDays = Math.round((then - now) / (24 * 60 * 60 * 1000));
  return diffDays > 0 ? diffDays : 7;
}



function renderCart() {
  if (!cartItems) return;
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-item">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <div>Qty 1</div>
        </div>
        <div>${formatCurrency(item.price)}</div>
      `;
      cartItems.appendChild(row);
    });
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  if (cartCount) cartCount.textContent = String(cart.length);
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  const shipping = 40;
  const total = subtotal + shipping;
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const item = {
      name: button.getAttribute('data-name') || 'Jewellery piece',
      price: Number(button.getAttribute('data-price') || 0),
    };
    cart.push(item);
    renderCart();
    if (orderMessage) orderMessage.textContent = `${item.name} added to your cart.`;
  });
});

if (cartToggle) {
  cartToggle.addEventListener('click', () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      if (orderMessage) orderMessage.textContent = 'Add at least one piece before placing your order.';
      return;
    }

    // Get form data
    const fullName = document.getElementById('fullName')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const city = document.getElementById('city')?.value || '';
    const state = document.getElementById('state')?.value || '';
    const pincode = document.getElementById('pincode')?.value || '';
    const receiptFile = document.getElementById('receiptFile')?.files[0];

    if (!fullName || !phone || !email || !address || !city || !state || !pincode) {
      if (orderMessage) orderMessage.textContent = 'Please fill all required fields.';
      return;
    }

    if (!receiptFile) {
      if (orderMessage) orderMessage.textContent = 'Please upload UPI transaction screenshot.';
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 40;
    const total = subtotal + shipping;

    const reader = new FileReader();
    reader.onload = async function() {
      const base64File = reader.result;
      const orderData = {
        full_name: fullName,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        payment_method: 'UPI',
        items: cart,
        subtotal,
        shipping,
        total,
        receipt_file: base64File,
        status: DEFAULT_ORDER_STATUS
      };

      try {
        if (orderMessage) orderMessage.textContent = 'Processing your order...';
        const response = await supabase.insert('orders', orderData);
        if (orderMessage) {
          orderMessage.textContent = 'Order placed successfully! Our concierge will contact you shortly.';
        }
        cart.length = 0;
        renderCart();
        checkoutForm.reset();
        const fileName = document.getElementById('fileName');
        if (fileName) {
          fileName.textContent = 'No file chosen';
          fileName.style.color = '#888';
        }
      } catch (error) {
        console.error('Error submitting order:', error);
        if (orderMessage) orderMessage.textContent = 'Error submitting order. Please try again: ' + error.message;
      }
    };

    reader.readAsDataURL(receiptFile);
  });
}

const payViaUpiButton = document.getElementById('payViaUpi');
if (payViaUpiButton) {
  payViaUpiButton.addEventListener('click', () => {
    if (cart.length === 0) {
      if (orderMessage) orderMessage.textContent = 'Add at least one item to your cart before paying.';
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 40;
    const total = subtotal + shipping;
    const amount = total.toFixed(2);
    const upiString = `upi://pay?pa=keerthi8015-2@okaxis&pn=Klyra%20Studio&am=${encodeURIComponent(amount)}&cu=INR&tn=Jewellery%20Order`;

    const link = document.createElement('a');
    link.href = upiString;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (orderMessage) orderMessage.textContent = `Opening UPI app for ₹${amount}...`;
  });
}

if (userOrdersForm) {
  userOrdersForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('trackEmail')?.value || '';
    const phone = document.getElementById('trackPhone')?.value || '';

    if (!email || !phone) {
      if (userOrderMessage) userOrderMessage.textContent = 'Please enter both email and phone to search your orders.';
      return;
    }

    if (userOrderMessage) userOrderMessage.textContent = 'Retrieving your orders...';
    if (userOrdersList) userOrdersList.innerHTML = '';

    try {
      const allOrders = await supabase.select('orders', { select: '*' });
      const matchingOrders = (allOrders || []).filter((order) => {
        const orderEmail = String(order.email || '').trim().toLowerCase();
        const orderPhone = String(order.phone || '').trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();
        return orderEmail === normalizedEmail || orderPhone === normalizedPhone;
      }).sort((a, b) => {
        const dateA = new Date(a.created_at || a.updated_at || 0).getTime();
        const dateB = new Date(b.created_at || b.updated_at || 0).getTime();
        return dateB - dateA;
      });

      if (!matchingOrders.length) {
        if (userOrderMessage) userOrderMessage.textContent = 'No orders found for this contact.';
        return;
      }

      if (userOrderMessage) userOrderMessage.textContent = '';
      userOrdersList.innerHTML = `
        <div style="margin-bottom: 16px; font-weight: 700; color: #2f2f2f;">Order history</div>
        ${matchingOrders.map(order => `
          <div class="order-card">
            <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; align-items:flex-start;">
              <div>
                <h4>Order ${order.id.slice(0, 8).toUpperCase()}</h4>
                <p><strong>Status:</strong> <span class="order-chip confirmed">Confirmed</span></p>
                <p><strong>Estimated delivery:</strong> ${formatDate(order.estimated_delivery_date)}</p>
                <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
                <p><strong>Items:</strong> ${order.items?.length || 0}</p>
              </div>
            </div>
          </div>
        `).join('')}
      `;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      if (userOrderMessage) userOrderMessage.textContent = 'Unable to retrieve orders. Please try again later.';
    }
  });
}

async function loadAdminOrders() {
  if (!adminOrdersList) return;
  adminOrdersList.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading orders...</p>';

  try {
    const orders = await supabase.select('orders', { select: '*' });
    if (!orders || orders.length === 0) {
      adminOrdersList.innerHTML = '<p style="text-align: center; padding: 2rem;">No orders yet.</p>';
      return;
    }

    adminOrdersList.innerHTML = orders.map(order => `
      <div class="order-card">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; align-items:flex-start;">
          <div>
            <h4>${order.full_name}</h4>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
            <p><strong>Delivery:</strong> ${formatDate(order.estimated_delivery_date)}</p>
            ${order.receipt_file ? `
              <button class="view-receipt-btn" data-order-id="${order.id}">View payment screenshot</button>
              <img class="receipt-image" data-order-id="${order.id}" src="${order.receipt_file}" alt="Payment screenshot for ${order.full_name}" style="display:none; width:100%; max-width:260px; border-radius:16px; margin-top:12px; border:1px solid rgba(18,18,18,0.1);" />
            ` : '<p style="margin-top:12px; color:#888;">No screenshot uploaded yet.</p>'}
          </div>
          <div style="text-align:right; display:flex; flex-direction:column; gap:10px;">
            <span class="order-chip confirmed">Confirmed</span>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.view-receipt-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const orderId = button.getAttribute('data-order-id');
        const image = document.querySelector(`img.receipt-image[data-order-id="${orderId}"]`);
        if (!image) return;
        image.style.display = image.style.display === 'block' ? 'none' : 'block';
        button.textContent = image.style.display === 'block' ? 'Hide payment screenshot' : 'View payment screenshot';
      });
    });
  } catch (error) {
    console.error('Error loading admin orders:', error);
    adminOrdersList.innerHTML = '<p style="text-align: center; padding: 2rem; color: red;">Error loading orders.</p>';
  }
}

if (heroPanel) {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    heroPanel.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translate3d(${x * 0.8}px, ${y * 0.8}px, 0)`;
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroPanel.style.transform = `rotateY(${scrollY / 60}deg) rotateX(${-scrollY / 120}deg)`;
  });
}

const brandLogo = document.querySelector('.brand');
const ordersSection = document.getElementById('orders');

if (brandLogo && ordersSection) {
  brandLogo.addEventListener('click', async (e) => {
    e.preventDefault();
    const isVisible = ordersSection.style.display !== 'none';

    if (!isVisible) {
      const enteredPassword = window.prompt('Enter admin password');
      if (enteredPassword !== ADMIN_PASSWORD) {
        if (enteredPassword !== null) {
          window.alert('Incorrect password.');
        }
        return;
      }
      isAdminAuthenticated = true;
      ordersSection.style.display = 'block';
      await loadAdminOrders();
      ordersSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      ordersSection.style.display = 'none';
    }
  });
}

renderCart();
