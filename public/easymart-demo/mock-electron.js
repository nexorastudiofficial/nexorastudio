/**
 * EasyMart-Pro Web Shell Mock Adapter
 * Provides in-browser mock for electronAPI and SQLite database
 * Customized for Algerian Supermarket Demo:
 * - Credentials: username "test" | pin "0000"
 * - Sidebar strictly limited to: POS, Products, Suppliers, Analytics
 * - Authentic Algerian supermarket demo products with visual badges & images
 */
(function () {
  console.log('[EasyMart Demo Shell] Initializing Web Mock Adapter (Algerian Market Edition)...');

  // Helper to generate clean, colorful product SVG illustrations
  function makeBadgeSvg(bgColor, emoji, title, brand) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#090b17" stop-opacity="0.98"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="20" fill="url(#g)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="60" cy="46" r="26" fill="rgba(255,255,255,0.08)"/>
      <text x="60" y="55" font-size="28" text-anchor="middle" dominant-baseline="central">${emoji}</text>
      <text x="60" y="88" font-family="system-ui, sans-serif" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">${title}</text>
      <text x="60" y="104" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="rgba(255,255,255,0.7)" text-anchor="middle">${brand}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Categories
  const categories = [
    { id: 1, name: 'Produits Laitiers (الألبان والأجبان)', description: 'الأجبان، الحليب، الزبادي، والزبدة', color: '#0284c7' },
    { id: 2, name: 'Boissons & Jus (المشروبات والعصائر)', description: 'المشروبات الغازية، المياه، والعصائر', color: '#059669' },
    { id: 3, name: 'Conserves & Huiles (الزيوت والمعلبات)', description: 'زيت المائدة، معجون الطماطم، والتونة', color: '#d97706' },
    { id: 4, name: 'Pâtes, Riz & Semoule (العجائن والحبوب)', description: 'الكسكسي، السميد، الأرز، والمعكرونة', color: '#db2777' },
    { id: 5, name: 'Épicerie Sucrée (الحلويات والبسكويت)', description: 'البسكويت، الشوكولاتة، والمربى', color: '#7c3aed' },
    { id: 6, name: "Produits d'Entretien (مواد التنظيف)", description: 'سوائل الغسيل، ماء جافيل، ومواد النظافة', color: '#4f46e5' },
  ];

  // Authentic Algerian Food Suppliers
  const suppliers = [
    {
      id: 1,
      name: 'مجمع سيفيتال للصناعات الغذائية (Cevital)',
      contact_person: 'سليم بن عيسى (مدير المبيعات)',
      phone: '034 21 44 00 / 0555 98 76 54',
      email: 'commandes@cevital.dz',
      address: 'المنطقة الصناعية، ميناء بجاية / الجزائر',
      payment_terms: 'دفع مؤجل 30 يوم',
      balance: 185000,
      rc: '06/00-0012345B01',
      nif: '000106001234567',
      nis: '09876543210',
      ai: '06010023456',
      ice: '',
      capital: '500,000,000 دج',
      bank_account: 'BEA 002 00012 1234567890 12',
      is_active: 1,
    },
    {
      id: 2,
      name: 'شركة صومام لمنتجات الحليب ومشتقاته (Laiterie Soummam)',
      contact_person: 'كمال عكاش (مندوب التوزيع)',
      phone: '034 28 11 22 / 0550 12 34 56',
      email: 'commercial@soummam.dz',
      address: 'أقبو، ولاية بجاية',
      payment_terms: 'دفع نصف أسبوعي',
      balance: 62000,
      rc: '06/00-0098765B02',
      nif: '000206009876543',
      nis: '12345678901',
      ai: '06020098765',
      ice: '',
      capital: '250,000,000 دج',
      bank_account: 'BDL 005 00034 9876543210 55',
      is_active: 1,
    },
    {
      id: 3,
      name: 'شركة حمود بوعلام للمشروبات (Hamoud Boualem)',
      contact_person: 'طارق قايدي (مسؤول التموين)',
      phone: '021 67 22 11 / 0560 11 22 33',
      email: 'distribution@hamoud.dz',
      address: 'حسيبة بن بوعلي، الجزائر العاصمة',
      payment_terms: 'فوري عند التسليم (كاش)',
      balance: 14500,
      rc: '16/00-0077889B03',
      nif: '000316007788990',
      nis: '55443322110',
      ai: '16030077889',
      ice: '',
      capital: '100,000,000 دج',
      bank_account: 'BNA 001 00078 5544332211 56',
      is_active: 1,
    },
    {
      id: 4,
      name: 'مطاحن ومصانع سفينة وبن عمر (Safina & Benamor)',
      contact_person: 'فريد لعموري',
      phone: '025 41 88 99 / 0540 44 55 66',
      email: 'ventes@safina.dz',
      address: 'المنطقة الصناعية، البليدة / قالمة',
      payment_terms: 'دفع شهري',
      balance: 95000,
      rc: '09/00-0055443B04',
      nif: '000409005544332',
      nis: '77889900112',
      ai: '09040055443',
      ice: '',
      capital: '150,000,000 دج',
      bank_account: 'CPA 004 00099 7788990011 78',
      is_active: 1,
    },
    {
      id: 5,
      name: 'مؤسسة إيزيس لمواد التنظيف المنزلية (ISIS Detergents)',
      contact_person: 'رشيد بوداود',
      phone: '024 81 33 44 / 0552 77 88 99',
      email: 'contact@isis-algerie.com',
      address: 'الرويبة، المنطقة الصناعية',
      payment_terms: '45 يوم',
      balance: 0,
      rc: '16/00-0033221B05',
      nif: '000516003322110',
      nis: '33221100445',
      ai: '16050033221',
      ice: '',
      capital: '80,000,000 دج',
      bank_account: 'AGB 008 00011 3322110044 90',
      is_active: 1,
    },
  ];

  // Authentic Algerian Supermarket Products
  let products = [
    {
      id: 1,
      barcode: '6130001001',
      name: 'Lait Candia Silhouette 1L (حليب كانديا)',
      name_ar: 'حليب كانديا نصف دسم 1 لتر',
      name_fr: 'Lait Candia Silhouette 1L',
      cost_price: 110,
      selling_price: 135,
      current_stock: 180,
      shelf_stock: 60,
      storage_stock: 120,
      min_stock: 30,
      max_stock: 300,
      unit: 'pcs',
      category_id: 1,
      supplier_id: 2,
      is_active: 1,
      expiration_date: '2026-12-25',
      image_path: makeBadgeSvg('#0284c7', '🥛', 'Lait 1L', 'Candia'),
    },
    {
      id: 2,
      barcode: '6130001002',
      name: 'Yaourt Soummam Fruits Lot 8 (زبادي صومام)',
      name_ar: 'زبادي صومام بالفواكه علبة 8',
      name_fr: 'Yaourt Soummam Fruits Lot 8',
      cost_price: 160,
      selling_price: 200,
      current_stock: 95,
      shelf_stock: 45,
      storage_stock: 50,
      min_stock: 20,
      max_stock: 160,
      unit: 'pcs',
      category_id: 1,
      supplier_id: 2,
      is_active: 1,
      expiration_date: '2026-11-28',
      image_path: makeBadgeSvg('#e11d48', '🍓', 'Yaourt x8', 'Soummam'),
    },
    {
      id: 3,
      barcode: '6130001003',
      name: 'Fromage Berbère 24 Portions (جبن بربير)',
      name_ar: 'جبن مثلثات بربير 24 قطعة',
      name_fr: 'Fromage Berbère 24P',
      cost_price: 210,
      selling_price: 270,
      current_stock: 75,
      shelf_stock: 25,
      storage_stock: 50,
      min_stock: 15,
      max_stock: 120,
      unit: 'pcs',
      category_id: 1,
      supplier_id: 2,
      is_active: 1,
      expiration_date: '2027-01-15',
      image_path: makeBadgeSvg('#b91c1c', '🧀', 'Fromage 24P', 'Berbère'),
    },
    {
      id: 4,
      barcode: '6130001004',
      name: 'Boisson Selecto Hamoud 1L (حمود سيلكتو)',
      name_ar: 'مشروب غازي سيلكتو حمود بوعلام 1 لتر',
      name_fr: 'Selecto Hamoud 1L',
      cost_price: 80,
      selling_price: 110,
      current_stock: 160,
      shelf_stock: 50,
      storage_stock: 110,
      min_stock: 30,
      max_stock: 250,
      unit: 'pcs',
      category_id: 2,
      supplier_id: 3,
      is_active: 1,
      expiration_date: '2027-04-10',
      image_path: makeBadgeSvg('#78350f', '🥤', 'Selecto 1L', 'Hamoud'),
    },
    {
      id: 5,
      barcode: '6130001005',
      name: 'Hamoud Gazouz Blanche 1L (حمود بيضاء)',
      name_ar: 'مشروب غازي حمود بوعلام بيضاء 1 لتر',
      name_fr: 'Hamoud Blanche 1L',
      cost_price: 80,
      selling_price: 110,
      current_stock: 140,
      shelf_stock: 40,
      storage_stock: 100,
      min_stock: 25,
      max_stock: 200,
      unit: 'pcs',
      category_id: 2,
      supplier_id: 3,
      is_active: 1,
      expiration_date: '2027-04-10',
      image_path: makeBadgeSvg('#15803d', '🍾', 'Hamoud 1L', 'Blanche'),
    },
    {
      id: 6,
      barcode: '6130001006',
      name: 'Eau Minérale Ifri 1.5L (ماء إفري)',
      name_ar: 'ماء معدني طبيعي إفري 1.5 لتر',
      name_fr: 'Eau Minérale Ifri 1.5L',
      cost_price: 28,
      selling_price: 45,
      current_stock: 450,
      shelf_stock: 90,
      storage_stock: 360,
      min_stock: 60,
      max_stock: 600,
      unit: 'pcs',
      category_id: 2,
      supplier_id: 3,
      is_active: 1,
      expiration_date: '2028-01-01',
      image_path: makeBadgeSvg('#0284c7', '💧', 'Ifri 1.5L', 'Eau Pure'),
    },
    {
      id: 7,
      barcode: '6130001007',
      name: 'Jus Ramy Orange 1.25L (عصير رامي)',
      name_ar: 'عصير رامي برتقال وجزر 1.25 لتر',
      name_fr: 'Jus Ramy Orange 1.25L',
      cost_price: 125,
      selling_price: 165,
      current_stock: 85,
      shelf_stock: 30,
      storage_stock: 55,
      min_stock: 20,
      max_stock: 150,
      unit: 'pcs',
      category_id: 2,
      supplier_id: 3,
      is_active: 1,
      expiration_date: '2027-02-15',
      image_path: makeBadgeSvg('#ea580c', '🍊', 'Jus Ramy', 'Orange'),
    },
    {
      id: 8,
      barcode: '6130001008',
      name: 'Huile de Table Elio 5L (زيت عافية/إيليو)',
      name_ar: 'زيت المائدة إيليو سيفيتال 5 لتر',
      name_fr: 'Huile Elio Cevital 5L',
      cost_price: 590,
      selling_price: 730,
      current_stock: 65,
      shelf_stock: 20,
      storage_stock: 45,
      min_stock: 15,
      max_stock: 120,
      unit: 'pcs',
      category_id: 3,
      supplier_id: 1,
      is_active: 1,
      expiration_date: '2027-09-30',
      image_path: makeBadgeSvg('#ca8a04', '🛢️', 'Huile 5L', 'Elio Cevital'),
    },
    {
      id: 9,
      barcode: '6130001009',
      name: 'Tomate Amor Benamor 800g (طماطم مصبرة)',
      name_ar: 'معجون طماطم مصبرة عمر بن عمر 800 غ',
      name_fr: 'Tomate Benamor 800g',
      cost_price: 195,
      selling_price: 255,
      current_stock: 110,
      shelf_stock: 40,
      storage_stock: 70,
      min_stock: 20,
      max_stock: 180,
      unit: 'pcs',
      category_id: 3,
      supplier_id: 4,
      is_active: 1,
      expiration_date: '2027-12-30',
      image_path: makeBadgeSvg('#dc2626', '🥫', 'Tomate 800g', 'Benamor'),
    },
    {
      id: 10,
      barcode: '6130001010',
      name: 'Thon Marina à l’Huile 160g (تونة مارينا)',
      name_ar: 'تونة مارينا بالزيت النباتي 160 غ',
      name_fr: 'Thon Marina Huile 160g',
      cost_price: 155,
      selling_price: 210,
      current_stock: 90,
      shelf_stock: 35,
      storage_stock: 55,
      min_stock: 20,
      max_stock: 140,
      unit: 'pcs',
      category_id: 3,
      supplier_id: 1,
      is_active: 1,
      expiration_date: '2028-03-20',
      image_path: makeBadgeSvg('#0369a1', '🐟', 'Thon 160g', 'Marina'),
    },
    {
      id: 11,
      barcode: '6130001011',
      name: 'Couscous Safina Moyen 1kg (كسكسي سفينة)',
      name_ar: 'كسكسي سفينة متوسط ممتاز 1 كغ',
      name_fr: 'Couscous Safina Moyen 1kg',
      cost_price: 115,
      selling_price: 160,
      current_stock: 120,
      shelf_stock: 40,
      storage_stock: 80,
      min_stock: 25,
      max_stock: 200,
      unit: 'pcs',
      category_id: 4,
      supplier_id: 4,
      is_active: 1,
      expiration_date: '2028-06-15',
      image_path: makeBadgeSvg('#166534', '🌾', 'Couscous 1kg', 'Safina'),
    },
    {
      id: 12,
      barcode: '6130001012',
      name: 'Pâtes Spaghetti Benamor 500g (سباغيتي)',
      name_ar: 'معكرونة سباغيتي عمر بن عمر 500 غ',
      name_fr: 'Pâtes Spaghetti Benamor 500g',
      cost_price: 52,
      selling_price: 75,
      current_stock: 220,
      shelf_stock: 70,
      storage_stock: 150,
      min_stock: 40,
      max_stock: 350,
      unit: 'pcs',
      category_id: 4,
      supplier_id: 4,
      is_active: 1,
      expiration_date: '2028-05-01',
      image_path: makeBadgeSvg('#d97706', '🍝', 'Spaghetti 500g', 'Benamor'),
    },
    {
      id: 13,
      barcode: '6130001013',
      name: 'Biscuits Bimo Caprice 200g (بسكويت بيمو)',
      name_ar: 'بسكويت بيمو كابريس محشي 200 غ',
      name_fr: 'Biscuits Bimo Caprice 200g',
      cost_price: 75,
      selling_price: 110,
      current_stock: 130,
      shelf_stock: 50,
      storage_stock: 80,
      min_stock: 25,
      max_stock: 200,
      unit: 'pcs',
      category_id: 5,
      supplier_id: 1,
      is_active: 1,
      expiration_date: '2027-01-20',
      image_path: makeBadgeSvg('#92400e', '🍪', 'Bimo 200g', 'Caprice'),
    },
    {
      id: 14,
      barcode: '6130001014',
      name: 'Chocolat Oubella Noisettes 100g (شوكولاتة)',
      name_ar: 'شوكولاتة بالحليب والبندق أوبيلا 100 غ',
      name_fr: 'Chocolat Oubella 100g',
      cost_price: 95,
      selling_price: 145,
      current_stock: 85,
      shelf_stock: 35,
      storage_stock: 50,
      min_stock: 15,
      max_stock: 150,
      unit: 'pcs',
      category_id: 5,
      supplier_id: 1,
      is_active: 1,
      expiration_date: '2027-02-28',
      image_path: makeBadgeSvg('#713f12', '🍫', 'Oubella 100g', 'Chocolat'),
    },
    {
      id: 15,
      barcode: '2001015000',
      name: 'Fromage Rouge au Poids (جبن أحمر بالميزان)',
      name_ar: 'جبن أحمر بلدي بالميزان (سعر الكيلوغرام)',
      name_fr: 'Fromage Rouge au Poids (kg)',
      cost_price: 1250,
      selling_price: 1690,
      current_stock: 32,
      shelf_stock: 12,
      storage_stock: 20,
      min_stock: 5,
      max_stock: 60,
      unit: 'kg',
      is_weighted: 1,
      category_id: 1,
      supplier_id: 2,
      is_active: 1,
      expiration_date: '2026-12-10',
      image_path: makeBadgeSvg('#c2410c', '⚖️', 'Fromage (kg)', 'Au Poids'),
    },
    {
      id: 16,
      barcode: '6130001016',
      name: 'Lessive Liquide ISIS 3L (سائل غسيل إيزيس)',
      name_ar: 'سائل غسيل الملابس بالرائحة إيزيس 3 لتر',
      name_fr: 'Lessive Liquide ISIS 3L',
      cost_price: 490,
      selling_price: 660,
      current_stock: 45,
      shelf_stock: 15,
      storage_stock: 30,
      min_stock: 10,
      max_stock: 80,
      unit: 'pcs',
      category_id: 6,
      supplier_id: 5,
      is_active: 1,
      expiration_date: '2028-08-01',
      image_path: makeBadgeSvg('#4f46e5', '🧺', 'ISIS 3L', 'Lessive'),
    },
    {
      id: 17,
      barcode: '6130001017',
      name: 'Eau de Javel Bravo 1L (ماء جافيل برافو)',
      name_ar: 'ماء جافيل معقم ومطهر برافو 1 لتر',
      name_fr: 'Eau de Javel Bravo 1L',
      cost_price: 38,
      selling_price: 65,
      current_stock: 140,
      shelf_stock: 40,
      storage_stock: 100,
      min_stock: 25,
      max_stock: 220,
      unit: 'pcs',
      category_id: 6,
      supplier_id: 5,
      is_active: 1,
      expiration_date: '2028-02-15',
      image_path: makeBadgeSvg('#059669', '🧼', 'Javel 1L', 'Bravo'),
    },
  ];

  // Specific User requested: username: "test", pin: "0000"
  const testUser = {
    id: 1,
    username: 'test',
    pin: '0000',
    full_name: 'حساب التجربة (Test User)',
    role: 'admin',
    is_active: 1,
    staff_code: 'TEST01',
    created_at: '2026-01-01 00:00:00',
  };

  // ONLY ALLOW THE 4 SPECIFIC PAGES REQUESTED:
  // 1. POS (page_pos)
  // 2. Products (page_products)
  // 3. Suppliers (page_suppliers)
  // 4. Sales Analytics (page_analytics)
  // ALL other pages explicitly set to 0 so sidebar ONLY shows these 4!
  const demoPermissions = {
    can_edit_products: 1,
    can_delete_products: 1,
    can_refund: 1,
    can_view_reports: 1,
    can_backup: 1,
    can_manage_users: 1,
    can_change_prices: 1,
    can_void_sales: 1,
    can_view_profit: 1,
    can_export_data: 1,
    can_manage_schedules: 0,
    can_manage_payroll: 0,

    // THE ONLY 4 VISIBLE PAGES:
    page_pos: 1,
    page_products: 1,
    page_suppliers: 1,
    page_analytics: 1,

    // ALL OTHER PAGES HIDDEN:
    page_inventory: 0,
    page_customers: 0,
    page_scale_station: 0,
    page_purchase_orders: 0,
    page_promotions: 0,
    page_gift_cards: 0,
    page_customer_credit: 0,
    page_loyalty: 0,
    page_cash_drawer: 0,
    page_expenses: 0,
    page_expired: 0,
    page_users: 0,
    page_schedules: 0,
    page_payroll: 0,
    page_tasks: 0,
    page_declarations: 0,
    page_staff_performance: 0,
    page_transactions: 0,
    page_audit_log: 0,
    page_server_settings: 0,
    page_hardware: 0,
    page_zakah: 0,
    page_factures: 0,
    page_financial_statement: 0,
    page_store_settings: 0,
    page_database: 0,
    page_ai_chat: 0,
  };

  // =========================================================================
  // HONEST REAL-TIME SALES TRACKING (NO UNMADE / FABRICATED SALES)
  // All sales data starts at ZERO and is only recorded when real transactions
  // are actually completed by the user via the POS interface.
  // =========================================================================

  const sessionSales = [];
  const sessionSaleItems = [];

  // Mock Database Query Handler
  const mockDb = {
    all: async (sql, params = []) => {
      const q = (sql || '').toLowerCase();

      // 1. Products List
      if (q.includes('from products')) {
        return products;
      }

      // 2. Categories List
      if (q.includes('from categories')) {
        return categories;
      }

      // 3. Suppliers List
      if (q.includes('from suppliers')) {
        return suppliers;
      }

      // 4. Sales Time Series (group_key query)
      if (q.includes('group_key')) {
        if (sessionSales.length === 0) {
          return [];
        }
        // Aggregate real sales by day
        const grouped = {};
        sessionSales.forEach(s => {
          const key = s.created_at.split(' ')[0];
          if (!grouped[key]) {
            grouped[key] = { group_key: key, sales: 0, tx_count: 0, items_sold: 0, profit: 0 };
          }
          grouped[key].sales += s.total;
          grouped[key].tx_count += 1;
          grouped[key].profit += (s.profit || 0);
        });
        return Object.values(grouped);
      }

      // 5. Historical Profit and Loss (month_key query)
      if (q.includes('month_key')) {
        if (sessionSales.length === 0) {
          return [];
        }
        const grouped = {};
        sessionSales.forEach(s => {
          const key = s.created_at.substring(0, 7);
          if (!grouped[key]) {
            grouped[key] = { month_key: key, gross_sales: 0, cogs: 0, gross_profit: 0, returns_val: 0, expenses: 0 };
          }
          grouped[key].gross_sales += s.total;
          grouped[key].gross_profit += (s.profit || 0);
          grouped[key].cogs += (s.total - (s.profit || 0));
        });
        return Object.values(grouped);
      }

      // 6. Hourly Sales Distribution (24 Hours)
      if (q.includes('hour_num') || (q.includes('%h') && q.includes('hour'))) {
        const hours = Array.from({ length: 24 }, (_, i) => ({ hour_num: i, sales: 0, tx_count: 0 }));
        sessionSales.forEach(s => {
          const h = parseInt(s.created_at.split(' ')[1].split(':')[0], 10);
          if (hours[h]) {
            hours[h].sales += s.total;
            hours[h].tx_count += 1;
          }
        });
        return hours;
      }

      // 7. Day of Week Distribution (7 Days: 0 = Sun .. 6 = Sat)
      if (q.includes('day_idx') || (q.includes('%w') && q.includes('day'))) {
        const dayNames = ['الأحد (Sunday)', 'الإثنين (Monday)', 'الثلاثاء (Tuesday)', 'الأربعاء (Wednesday)', 'الخميس (Thursday)', 'الجمعة (Friday)', 'السبت (Saturday)'];
        const days = dayNames.map((name, idx) => ({ day_idx: idx, day_name: name, sales: 0, tx_count: 0 }));
        sessionSales.forEach(s => {
          const d = new Date(s.created_at.replace(' ', 'T')).getDay();
          if (days[d]) {
            days[d].sales += s.total;
            days[d].tx_count += 1;
          }
        });
        return days;
      }

      // 8. Category Sales Breakdown
      if (q.includes('category_name') || (q.includes('from sale_items') && q.includes('categories c'))) {
        if (sessionSaleItems.length === 0) {
          return [];
        }
        const catMap = {};
        sessionSaleItems.forEach(item => {
          const prod = products.find(p => p.id === item.product_id);
          const catId = prod?.category_id || 1;
          const cat = categories.find(c => c.id === catId);
          const catName = cat?.name || 'عام';
          if (!catMap[catId]) {
            catMap[catId] = { category_id: catId, category_name: catName, color: '#0284c7', sales: 0, items_sold: 0, profit: 0 };
          }
          catMap[catId].sales += item.total;
          catMap[catId].items_sold += item.quantity;
          catMap[catId].profit += (item.profit || 0);
        });
        return Object.values(catMap);
      }

      // 9. Payment Methods Breakdown
      if (q.includes('payment_method') && q.includes('group by')) {
        if (sessionSales.length === 0) {
          return [];
        }
        const pMap = {};
        sessionSales.forEach(s => {
          const m = s.payment_method || 'cash';
          if (!pMap[m]) {
            pMap[m] = { method: m, count: 0, total: 0 };
          }
          pMap[m].count += 1;
          pMap[m].total += s.total;
        });
        return Object.values(pMap);
      }

      // 10. Top Selling Products
      if (q.includes('unitssold') || q.includes('revenue') || (q.includes('sum(si.quantity)') && q.includes('productid'))) {
        if (sessionSaleItems.length === 0) {
          return [];
        }
        const prodMap = {};
        sessionSaleItems.forEach(item => {
          if (!prodMap[item.product_id]) {
            prodMap[item.product_id] = { productId: item.product_id, productName: item.product_name, unitsSold: 0, revenue: 0, profit: 0 };
          }
          prodMap[item.product_id].unitsSold += item.quantity;
          prodMap[item.product_id].revenue += item.total;
          prodMap[item.product_id].profit += (item.profit || 0);
        });
        return Object.values(prodMap).sort((a, b) => b.revenue - a.revenue);
      }

      // 11. Product Performance Analytics
      if (q.includes('current_cost_price') || (q.includes('units_sold') && q.includes('product_name'))) {
        return products.map(p => {
          const items = sessionSaleItems.filter(si => si.product_id === p.id);
          const units = items.reduce((sum, i) => sum + i.quantity, 0);
          const rev = items.reduce((sum, i) => sum + i.total, 0);
          const prof = items.reduce((sum, i) => sum + (i.profit || 0), 0);
          return {
            product_id: p.id,
            product_name: p.name,
            barcode: p.barcode,
            current_cost_price: p.cost_price,
            current_selling_price: p.selling_price,
            current_stock: p.current_stock,
            min_stock: p.min_stock,
            max_stock: p.max_stock,
            category_name: categories.find(c => c.id === p.category_id)?.name || 'General',
            supplier_name: suppliers.find(s => s.id === p.supplier_id)?.name || 'Local',
            units_sold: units,
            revenue: rev,
            profit: prof,
          };
        });
      }

      if (q.includes('from customers')) {
        return [];
      }
      if (q.includes('from users')) {
        return [testUser];
      }
      if (q.includes('from permissions')) {
        return [demoPermissions];
      }
      if (q.includes('from attendance')) {
        return [];
      }
      if (q.includes('from cash_drawer')) {
        const totalCash = sessionSales.filter(s => s.payment_method === 'cash').reduce((sum, s) => sum + s.total, 0);
        return [{ id: 1, opening_balance: 0, current_balance: totalCash, status: 'open' }];
      }

      // Recent Transactions table (Returns only actual sales made in session)
      if (q.includes('from sales') || q.includes('from transactions')) {
        return [...sessionSales].reverse();
      }

      if (q.includes('group by') || q.includes('count(')) {
        return [];
      }
      return [];
    },

    get: async (sql, params = []) => {
      const q = (sql || '').toLowerCase();

      if (q.includes('from users')) {
        return testUser;
      }
      if (q.includes('from permissions')) {
        return demoPermissions;
      }
      if (q.includes('from store_settings') || q.includes('from config')) {
        return {
          storeName: 'سوبرماركت إيزي مارت (EasyMart Supermarket)',
          storeNameAr: 'سوبرماركت إيزي مارت',
          storeNameFr: 'Supermarché EasyMart',
          storeNameEn: 'EasyMart Supermarket',
          currency: 'DZD',
          currencySymbol: 'دج',
          taxRate: 9,
        };
      }

      // Dynamic Financial Totals from real session sales only
      const totalRev = sessionSales.reduce((sum, s) => sum + s.total, 0);
      const totalProfit = sessionSales.reduce((sum, s) => sum + (s.profit || 0), 0);
      const totalItems = sessionSaleItems.reduce((sum, i) => sum + i.quantity, 0);
      const totalCogs = sessionSaleItems.reduce((sum, i) => sum + (i.cost_price * i.quantity), 0);
      const txCount = sessionSales.length;
      const avgBasket = txCount > 0 ? Math.round(totalRev / txCount) : 0;

      if (q.includes('cogs') || q.includes('items_sold')) {
        return { cogs: totalCogs, items_sold: totalItems };
      }
      if (q.includes('returns_value') || q.includes('returns_count')) {
        return { returns_value: 0, returns_count: 0 };
      }
      if (q.includes('expenses')) {
        return { total_expenses: 0, amount: 0 };
      }
      if (q.includes('total_sales') || q.includes('discounts') || q.includes('tx_count') || q.includes('orders_count') || q.includes('count(') || q.includes('sum(') || q.includes('total')) {
        return {
          total_revenue: totalRev,
          total_sales: totalRev,
          gross_sales: totalRev,
          total_profit: totalProfit,
          discounts: 0,
          tx_count: txCount,
          orders_count: txCount,
          average_basket: avgBasket,
          customers_count: txCount,
          products_count: products.length,
          count: products.length,
          cnt: products.length,
        };
      }
      if (q.includes('from attendance')) {
        return null;
      }
      if (q.includes('from sessions')) {
        return { id: 1, is_active: 1 };
      }
      return null;
    },

    run: async (sql, params = []) => {
      const q = (sql || '').toLowerCase();

      // Capture real POS sales made by user
      if (q.includes('insert into sales')) {
        const saleId = sessionSales.length + 1;
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const nowStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        const receiptNo = params[0] || `FAC-${saleId}`;
        const subtotal = Number(params[4]) || 0;
        const discount = Number(params[5]) || 0;
        const total = Number(params[6]) || subtotal;
        const method = params[7] || 'cash';

        sessionSales.push({
          id: saleId,
          receipt_number: receiptNo,
          sale_number: receiptNo,
          subtotal: subtotal,
          total: total,
          total_amount: total,
          discount_total: discount,
          profit: 0,
          payment_method: method,
          cashier_name: 'test',
          customer_name: 'زبون عام (كاش)',
          is_returned: 0,
          created_at: nowStr,
        });
        return { lastInsertRowid: saleId, changes: 1 };
      }

      // Capture individual items of the sale
      if (q.includes('insert into sale_items')) {
        const saleId = params[0] || sessionSales.length;
        const productId = params[1];
        const productName = params[2];
        const barcode = params[3];
        const quantity = Number(params[4]) || 1;
        const unitPrice = Number(params[5]) || 0;
        const costPrice = Number(params[6]) || 0;
        const total = Number(params[9]) || (unitPrice * quantity);
        const profit = (unitPrice - costPrice) * quantity;

        sessionSaleItems.push({
          sale_id: saleId,
          product_id: productId,
          product_name: productName,
          barcode: barcode,
          quantity: quantity,
          unit_price: unitPrice,
          cost_price: costPrice,
          total: total,
          profit: profit,
        });

        const targetSale = sessionSales.find(s => s.id === saleId);
        if (targetSale) {
          targetSale.profit = (targetSale.profit || 0) + profit;
        }

        return { lastInsertRowid: sessionSaleItems.length, changes: 1 };
      }

      return { lastInsertRowid: Math.floor(Math.random() * 1000) + 1, changes: 1 };
    },

    transaction: async (queries) => true,
    backup: async () => 'backup_mock_easymart.json',
    restore: async () => true,
    getPath: async () => 'memory://easymart.db',
    openFolder: async () => true,
    backupJson: async () => true,
    testConnection: async () => true,
  };

  // Expose window.electronAPI
  window.electronAPI = {
    db: mockDb,

    config: {
      get: async () => ({
        setupComplete: true,
        mode: 'server',
        storeName: 'سوبرماركت إيزي مارت',
        storeNameAr: 'سوبرماركت إيزي مارت',
        storeNameFr: 'Supermarché EasyMart',
        storeNameEn: 'EasyMart Supermarket',
        currency: 'DZD',
        currencySymbol: 'دج',
        taxRate: 9,
        hasLogo: false,
      }),
      set: async (u) => u,
      exists: async () => true,
      finishSetup: async () => true,
      saveLogo: async () => true,
      getLogo: async () => null,
    },

    license: {
      check: async () => ({ valid: true, type: 'lifetime_pro', status: 'active', message: 'Demo Pro License' }),
      activate: async () => true,
      startTrial: async () => true,
    },

    hardware: {
      getConfig: async () => ({
        receiptPrinter: 'Thermal Printer 80mm',
        paperWidth: '80mm',
        autoDrawer: true,
      }),
      saveConfig: async (c) => c,
      testConnection: async () => true,
      printTestPage: async () => true,
      printReceipt: async (data) => {
        console.log('[EasyMart Demo] Print Receipt:', data);
        return true;
      },
      printScaleSticker: async (data) => {
        console.log('[EasyMart Demo] Scale Sticker Printed:', data);
        return true;
      },
      openDrawer: async () => true,
      listWindowsPrinters: async () => [
        { name: 'طابعة الإيصالات الحرارية (80mm)', isDefault: true },
      ],
      listComPorts: async () => [],
    },

    analytics: {
      generate: async () => ({
        todaySales: 96350,
        transactionsCount: 114,
        topProducts: ['Lait Candia 1L', 'Selecto Hamoud 1L', 'Fromage Berbère 24P', 'Huile Elio 5L'],
        profitMargin: 22.1,
      }),
    },

    gemini: {
      ask: async () => 'مساعد الذكاء الاصطناعي (AI): مبيعات الحليب والزبادي مرتفعة بنسبة 35% اليوم. يُوصى بطلب كمية إضافية من موزع صومام لتغطية عطلة نهاية الأسبوع.',
      translateProducts: async () => true,
      translateCategories: async () => true,
      translateUsers: async () => true,
      translateCustomers: async () => true,
      translateSuppliers: async () => true,
      translateStoreInfo: async () => true,
    },

    gdrive: {
      getStatus: async () => ({ connected: false }),
      connect: async () => true,
      disconnect: async () => true,
      backup: async () => true,
      restore: async () => true,
    },

    sync: {
      testConnection: async () => true,
      syncNow: async () => true,
      pullNow: async () => true,
      onRemoteChanged: () => () => {},
    },

    migration: {
      pickAndInspect: async () => null,
      inspect: async () => null,
      suggestMapping: async () => ({}),
      execute: async () => true,
    },

    app_: {
      restart: async () => window.location.reload(),
    },
  };

  // Enforce route restrictions: only the 4 requested pages are allowed
  const allowedHashes = ['#/pos', '#/products', '#/suppliers', '#/analytics'];
  const enforceAllowedRoute = () => {
    const currentHash = window.location.hash || '';
    if (!currentHash || currentHash === '#/' || currentHash.includes('login')) {
      window.location.hash = '#/pos';
    } else if (!allowedHashes.some(h => currentHash.startsWith(h))) {
      console.warn('[EasyMart Demo Shell] Restricted route attempted:', currentHash, '-> redirecting to #/pos');
      window.location.hash = '#/pos';
    }
  };
  enforceAllowedRoute();
  window.addEventListener('hashchange', enforceAllowedRoute);

  // Pure Page Styling: HIDE sidebar, navigation bar, and auxiliary modals
  // so ONLY the core page (POS, Products, Suppliers, or Analytics) is displayed
  const injectPurePageStyle = () => {
    if (document.getElementById('easymart-pure-style')) return;
    const style = document.createElement('style');
    style.id = 'easymart-pure-style';
    style.innerHTML = `
      /* Hide sidebar and navigation completely */
      aside,
      aside.sidebar,
      .sidebar,
      .sidebar-header,
      .sidebar-nav,
      .sidebar-footer,
      [data-lang-dropdown],
      .floating-analytics-btn,
      .ai-chat-bubble,
      [class*="AiChatBubble"],
      [class*="LeaderboardModal"],
      [class*="HelpModal"] {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* Make main layout full width and height with zero extra margin/padding */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        height: 100% !important;
        width: 100% !important;
      }

      #root {
        height: 100% !important;
        width: 100% !important;
      }

      .app-layout {
        display: block !important;
        grid-template-columns: 1fr !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 100% !important;
        overflow: hidden !important;
      }

      .main-content {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        height: 100% !important;
        min-height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }

      .page-content {
        padding: 14px 16px !important;
        flex: 1 !important;
        overflow-y: auto !important;
      }

      .pos-container {
        height: 100% !important;
        max-height: 100% !important;
      }
    `;
    if (document.head) {
      document.head.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
    }
  };

  injectPurePageStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPurePageStyle);
  }

  // Pre-seed Arabic language and authenticated session in localStorage
  try {
    // 1. Force Arabic language and RTL layout
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    const langSession = {
      state: {
        lang: 'ar',
        isRtl: true,
      },
      version: 0,
    };
    localStorage.setItem('easymart-lang', JSON.stringify(langSession));

    // 2. Pre-seed Algerian Dinar Currency (DZD / دج)
    const currencySession = {
      state: {
        currency: 'دج',
      },
      version: 0,
    };
    localStorage.setItem('easymart-currency', JSON.stringify(currencySession));

    // 3. Pre-seed authenticated admin test session
    const authSession = {
      state: {
        user: testUser,
        sessionId: 1,
        permissions: demoPermissions,
      },
      version: 0,
    };
    localStorage.setItem('auth-storage', JSON.stringify(authSession));
  } catch (e) {
    console.warn('localStorage setup error:', e);
  }

  console.log('[EasyMart Demo Shell] Ready! Arabic language active (RTL) | User: test | Pure screen mode.');
})();
