import type { Product, Category, CompanyInfo, Quote, Order, TeamMember, Certification, AnalyticsSummary } from "./types";

export const companyInfo: CompanyInfo = {
  name: "Ningbo Siyang",
  tagline: "Professional Industrial Power Tools",
  description:
    "Ningbo Siyang is a leading manufacturer and exporter of professional-grade industrial power tools based in Ningbo, Zhejiang, China. With over 15 years of manufacturing excellence, we deliver high-performance tools to B2B clients worldwide.",
  address: {
    street: "No. 88 Industrial Avenue, Beilun District",
    city: "Ningbo",
    province: "Zhejiang",
    country: "China",
    postalCode: "315800",
  },
  phone: "+86 574 8888 6666",
  email: "info@ningbosiyang.com",
  website: "www.ningbosiyang.com",
};

export const categories: Category[] = [
  { _id: "cat-001", slug: "drills-drivers", title: "Drills & Drivers", description: "High-torque cordless and corded drills for heavy-duty industrial applications.", productCount: 4, imageUrl: "/images/categories/drills.jpg" },
  { _id: "cat-002", slug: "saws", title: "Saws", description: "Precision circular saws, jigsaws, and reciprocating saws for professional cutting.", productCount: 3, imageUrl: "/images/categories/saws.jpg" },
  { _id: "cat-003", slug: "grinders", title: "Grinders", description: "Industrial angle grinders and bench grinders for metalwork and fabrication.", productCount: 3, imageUrl: "/images/categories/grinders.jpg" },
  { _id: "cat-004", slug: "sanders", title: "Sanders", description: "Orbital sanders and belt sanders for smooth finishing on industrial surfaces.", productCount: 2, imageUrl: "/images/categories/sanders.jpg" },
  { _id: "cat-005", slug: "impact-tools", title: "Impact Tools", description: "Heavy-duty impact wrenches and drivers for automotive and construction work.", productCount: 3, imageUrl: "/images/categories/impact.jpg" },
  { _id: "cat-006", slug: "combo-kits", title: "Combo Kits", description: "Value-packed professional tool kits for complete workshop outfitting.", productCount: 2, imageUrl: "/images/categories/kits.jpg" },
];

export const products: Product[] = [
  { _id: "prod-001", slug: "sy-2100-cordless-drill", title: "SY-2100 Cordless Hammer Drill", description: "The SY-2100 delivers 120Nm of torque with a brushless motor, making it the ideal choice for heavy-duty drilling in concrete, steel, and wood. Features a 20V lithium-ion battery system with fast-charge capability and an all-metal gear housing for maximum durability on the job site.", category: "Drills & Drivers", categorySlug: "drills-drivers", imageUrl: "/images/products/sy-2100.jpg", images: ["/images/products/sy-2100.jpg", "/images/products/sy-2100-2.jpg"], specs: { "Max Torque": "120 Nm", Voltage: "20V DC", "No-Load Speed": "0-2000 RPM", "Chuck Size": '13mm (1/2")', Weight: "2.1 kg", "Battery Capacity": "4.0 Ah Li-Ion" }, moq: 200, tags: ["cordless", "brushless", "hammer-drill"], featured: true },
  { _id: "prod-002", slug: "sy-2200-corded-drill", title: "SY-2200 Corded Impact Drill", description: "A workhorse corded impact drill with 1050W motor and variable speed trigger. Designed for continuous industrial use with reinforced housing and dual-bearing spindle construction for precision and longevity.", category: "Drills & Drivers", categorySlug: "drills-drivers", imageUrl: "/images/products/sy-2200.jpg", images: ["/images/products/sy-2200.jpg"], specs: { Power: "1050W", Voltage: "220V AC", "No-Load Speed": "0-3000 RPM", "Chuck Size": '13mm (1/2")', Weight: "2.8 kg", "Impact Rate": "48,000 BPM" }, moq: 300, tags: ["corded", "impact", "industrial"], featured: true },
  { _id: "prod-003", slug: "sy-2300-drill-driver", title: "SY-2300 Compact Drill Driver", description: "Compact 12V drill driver for precision assembly and light-duty operations. Features 20+1 torque settings, LED work light, and ergonomic soft-grip handle for extended use comfort.", category: "Drills & Drivers", categorySlug: "drills-drivers", imageUrl: "/images/products/sy-2300.jpg", images: ["/images/products/sy-2300.jpg"], specs: { "Max Torque": "35 Nm", Voltage: "12V DC", "No-Load Speed": "0-1500 RPM", "Chuck Size": '10mm (3/8")', Weight: "1.1 kg", "Torque Settings": "20+1" }, moq: 500, tags: ["compact", "cordless", "precision"], featured: false },
  { _id: "prod-004", slug: "sy-2400-rotary-hammer", title: "SY-2400 SDS-Plus Rotary Hammer", description: "Professional-grade rotary hammer with 3-mode operation: drill, hammer-drill, and chisel. 1500W motor delivers 5.5J of impact energy for demanding concrete and masonry work.", category: "Drills & Drivers", categorySlug: "drills-drivers", imageUrl: "/images/products/sy-2400.jpg", images: ["/images/products/sy-2400.jpg"], specs: { Power: "1500W", "Impact Energy": "5.5 J", "No-Load Speed": "0-850 RPM", "Chuck Type": "SDS-Plus", Weight: "4.2 kg", "Drill Capacity": "32mm in concrete" }, moq: 150, tags: ["rotary-hammer", "sds-plus", "heavy-duty"], featured: true },
  { _id: "prod-005", slug: "sy-3100-circular-saw", title: "SY-3100 Industrial Circular Saw", description: "Precision industrial circular saw with 2200W motor and laser guide alignment.", category: "Saws", categorySlug: "saws", imageUrl: "/images/products/sy-3100.jpg", images: ["/images/products/sy-3100.jpg"], specs: { Power: "2200W", "Blade Diameter": '235mm (9-1/4")', "No-Load Speed": "4800 RPM", "Max Depth at 90\u00b0": "85mm", Weight: "5.8 kg", "Bevel Capacity": "0-45\u00b0" }, moq: 150, tags: ["circular-saw", "precision", "laser-guide"], featured: true },
  { _id: "prod-006", slug: "sy-3200-jigsaw", title: "SY-3200 Variable-Speed Jigsaw", description: "Professional jigsaw with 4-stage orbital action and tool-free blade change.", category: "Saws", categorySlug: "saws", imageUrl: "/images/products/sy-3200.jpg", images: ["/images/products/sy-3200.jpg"], specs: { Power: "800W", "Stroke Length": "26mm", "No-Load Speed": "500-3100 SPM", "Max Cut Wood": "110mm", Weight: "2.6 kg", "Orbital Settings": "4-stage" }, moq: 200, tags: ["jigsaw", "variable-speed", "orbital"], featured: false },
  { _id: "prod-007", slug: "sy-3300-reciprocating-saw", title: "SY-3300 Reciprocating Saw", description: "Heavy-duty reciprocating saw for demolition and rough-cutting.", category: "Saws", categorySlug: "saws", imageUrl: "/images/products/sy-3300.jpg", images: ["/images/products/sy-3300.jpg"], specs: { Power: "1300W", "Stroke Length": "28mm", "No-Load Speed": "0-2800 SPM", "Max Cut Wood": "300mm", Weight: "4.1 kg", "Blade Clamp": "Universal quick-change" }, moq: 150, tags: ["reciprocating", "demolition", "heavy-duty"], featured: false },
  { _id: "prod-008", slug: "sy-4100-angle-grinder", title: "SY-4100 Angle Grinder 125mm", description: "Industrial 125mm angle grinder with 1400W motor and anti-kickback clutch.", category: "Grinders", categorySlug: "grinders", imageUrl: "/images/products/sy-4100.jpg", images: ["/images/products/sy-4100.jpg"], specs: { Power: "1400W", "Disc Diameter": '125mm (5")', "No-Load Speed": "11,000 RPM", "Spindle Thread": "M14", Weight: "2.5 kg", "Safety Feature": "Anti-kickback clutch" }, moq: 300, tags: ["angle-grinder", "125mm", "anti-kickback"], featured: true },
  { _id: "prod-009", slug: "sy-4200-angle-grinder-230", title: "SY-4200 Angle Grinder 230mm", description: "Large 230mm angle grinder for heavy metal fabrication.", category: "Grinders", categorySlug: "grinders", imageUrl: "/images/products/sy-4200.jpg", images: ["/images/products/sy-4200.jpg"], specs: { Power: "2600W", "Disc Diameter": '230mm (9")', "No-Load Speed": "6500 RPM", "Spindle Thread": "M14", Weight: "5.9 kg", "Safety Feature": "Soft-start, constant speed" }, moq: 150, tags: ["angle-grinder", "230mm", "heavy-duty"], featured: false },
  { _id: "prod-010", slug: "sy-4300-bench-grinder", title: "SY-4300 Bench Grinder", description: "Double-wheel bench grinder with 550W motor.", category: "Grinders", categorySlug: "grinders", imageUrl: "/images/products/sy-4300.jpg", images: ["/images/products/sy-4300.jpg"], specs: { Power: "550W", "Wheel Size": '200mm (8")', "No-Load Speed": "2950 RPM", "Wheel Bore": "32mm", Weight: "12.5 kg", "Wheel Grades": "36 grit / 80 grit" }, moq: 100, tags: ["bench-grinder", "sharpening", "workshop"], featured: false },
  { _id: "prod-011", slug: "sy-5100-orbital-sander", title: "SY-5100 Random Orbital Sander", description: "Professional random orbital sander with variable speed control and dust collection.", category: "Sanders", categorySlug: "sanders", imageUrl: "/images/products/sy-5100.jpg", images: ["/images/products/sy-5100.jpg"], specs: { Power: "450W", "Pad Diameter": '150mm (6")', "Orbit Speed": "4,000-12,000 OPM", "Orbit Diameter": "5mm", Weight: "2.3 kg", "Dust Collection": "Integrated bag + port" }, moq: 200, tags: ["orbital-sander", "variable-speed", "dust-collection"], featured: false },
  { _id: "prod-012", slug: "sy-5200-belt-sander", title: "SY-5200 Belt Sander", description: "Heavy-duty belt sander with 1200W motor for rapid material removal.", category: "Sanders", categorySlug: "sanders", imageUrl: "/images/products/sy-5200.jpg", images: ["/images/products/sy-5200.jpg"], specs: { Power: "1200W", "Belt Size": "100mm x 610mm", "Belt Speed": "250-450 m/min", "Sanding Area": "100mm x 170mm", Weight: "4.8 kg", Feature: "Flush-edge design" }, moq: 150, tags: ["belt-sander", "heavy-duty", "flush-edge"], featured: false },
  { _id: "prod-013", slug: "sy-6100-impact-wrench", title: "SY-6100 Cordless Impact Wrench", description: "Professional 20V brushless impact wrench delivering 350Nm of torque.", category: "Impact Tools", categorySlug: "impact-tools", imageUrl: "/images/products/sy-6100.jpg", images: ["/images/products/sy-6100.jpg"], specs: { "Max Torque": "350 Nm", Voltage: "20V DC", "No-Load Speed": "0-2800 RPM", "Drive Size": '1/2"', Weight: "2.4 kg", "Speed Settings": "3-speed selector" }, moq: 200, tags: ["impact-wrench", "cordless", "brushless"], featured: true },
  { _id: "prod-014", slug: "sy-6200-impact-driver", title: "SY-6200 Compact Impact Driver", description: "Compact 20V impact driver with 200Nm torque and 1/4\" hex chuck.", category: "Impact Tools", categorySlug: "impact-tools", imageUrl: "/images/products/sy-6200.jpg", images: ["/images/products/sy-6200.jpg"], specs: { "Max Torque": "200 Nm", Voltage: "20V DC", "No-Load Speed": "0-3200 RPM", "Impact Rate": "0-4000 IPM", Weight: "1.2 kg", "Chuck Type": '1/4" Hex' }, moq: 300, tags: ["impact-driver", "compact", "cordless"], featured: false },
  { _id: "prod-015", slug: "sy-6300-electric-impact-wrench", title: "SY-6300 Electric Impact Wrench", description: "Corded electric impact wrench with 1050W motor delivering 600Nm torque.", category: "Impact Tools", categorySlug: "impact-tools", imageUrl: "/images/products/sy-6300.jpg", images: ["/images/products/sy-6300.jpg"], specs: { Power: "1050W", "Max Torque": "600 Nm", "No-Load Speed": "0-2200 RPM", "Drive Size": '1/2"', Weight: "3.8 kg", "Impact Rate": "2200 IPM" }, moq: 100, tags: ["impact-wrench", "corded", "heavy-duty"], featured: false },
  { _id: "prod-016", slug: "sy-7100-pro-kit", title: "SY-7100 Professional 5-Piece Combo Kit", description: "Complete professional combo kit featuring drill driver, impact driver, circular saw, reciprocating saw, and LED flashlight.", category: "Combo Kits", categorySlug: "combo-kits", imageUrl: "/images/products/sy-7100.jpg", images: ["/images/products/sy-7100.jpg"], specs: { "Pieces Included": "5 tools + 2 batteries", "Battery System": "20V 4.0Ah Li-Ion", Charger: "Rapid charger included", Case: "Heavy-duty blow-mold", "Total Weight": "14.5 kg (kit)", Warranty: "2-year manufacturer" }, moq: 50, tags: ["combo-kit", "professional", "5-piece"], featured: true },
  { _id: "prod-017", slug: "sy-7200-starter-kit", title: "SY-7200 Starter 3-Piece Kit", description: "Essential starter kit with drill driver, impact driver, and LED work light.", category: "Combo Kits", categorySlug: "combo-kits", imageUrl: "/images/products/sy-7200.jpg", images: ["/images/products/sy-7200.jpg"], specs: { "Pieces Included": "3 tools + 2 batteries", "Battery System": "20V 2.0Ah Li-Ion", Charger: "Standard charger included", Case: "Canvas carry bag", "Total Weight": "6.8 kg (kit)", Warranty: "2-year manufacturer" }, moq: 100, tags: ["combo-kit", "starter", "3-piece"], featured: false },
];

export const featuredProducts = products.filter((p) => p.featured);

// --- Mock Quotes ---

export const mockQuotes: Quote[] = [
  {
    _id: "QT-001",
    items: [
      { productId: "prod-001", slug: "sy-2100-cordless-drill", title: "SY-2100 Cordless Hammer Drill", quantity: 200, imageUrl: "/images/products/sy-2100.jpg", moq: 200 },
      { productId: "prod-008", slug: "sy-4100-angle-grinder", title: "SY-4100 Angle Grinder 125mm", quantity: 300, imageUrl: "/images/products/sy-4100.jpg", moq: 300 },
    ],
    status: "accepted",
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2026-01-05T14:30:00Z",
    notes: "Need samples before full production order.",
    userId: "user-001",
    userName: "Demo User",
    userCompany: "Demo Company",
    userEmail: "demo@company.com",
    internalNotes: "Good client. Priority fulfillment.",
  },
  {
    _id: "QT-002",
    items: [
      { productId: "prod-016", slug: "sy-7100-pro-kit", title: "SY-7100 Professional 5-Piece Combo Kit", quantity: 100, imageUrl: "/images/products/sy-7100.jpg", moq: 50 },
    ],
    status: "submitted",
    createdAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-02-01T08:00:00Z",
    notes: "Urgent order for European distributor.",
    userId: "user-001",
    userName: "Demo User",
    userCompany: "Demo Company",
    userEmail: "demo@company.com",
  },
  {
    _id: "QT-003",
    items: [
      { productId: "prod-005", slug: "sy-3100-circular-saw", title: "SY-3100 Industrial Circular Saw", quantity: 150, imageUrl: "/images/products/sy-3100.jpg", moq: 150 },
      { productId: "prod-013", slug: "sy-6100-impact-wrench", title: "SY-6100 Cordless Impact Wrench", quantity: 200, imageUrl: "/images/products/sy-6100.jpg", moq: 200 },
    ],
    status: "reviewed",
    createdAt: "2026-01-20T12:00:00Z",
    updatedAt: "2026-02-10T09:00:00Z",
    notes: "Requesting OEM branding option.",
    userId: "user-002",
    userName: "John Smith",
    userCompany: "Smith Industrial LLC",
    userEmail: "john@smithindustrial.com",
    internalNotes: "OEM request - forward to branding team.",
  },
];

// --- Mock Orders ---

export const mockOrders: Order[] = [
  {
    _id: "ORD-001",
    quoteId: "QT-001",
    status: "shipped",
    createdAt: "2026-01-10T10:00:00Z",
    items: mockQuotes[0].items,
    trackingNumber: "CN2026018834562",
    estimatedDelivery: "2026-02-28",
  },
  {
    _id: "ORD-002",
    quoteId: "QT-001",
    status: "production",
    createdAt: "2026-02-05T10:00:00Z",
    items: [{ productId: "prod-004", slug: "sy-2400-rotary-hammer", title: "SY-2400 SDS-Plus Rotary Hammer", quantity: 150, imageUrl: "/images/products/sy-2400.jpg", moq: 150 }],
    estimatedDelivery: "2026-03-20",
  },
];

// --- Mock Team ---

export const mockTeam: TeamMember[] = [
  { _id: "tm-001", name: "Chen Wei", role: "CEO & Founder", department: "Executive", bio: "Over 25 years of experience in power tool manufacturing. Founded Ningbo Siyang with a vision to deliver world-class industrial tools.", imageUrl: "/images/team/ceo.jpg" },
  { _id: "tm-002", name: "Li Mei", role: "VP of Engineering", department: "Engineering", bio: "Leads our R&D team of 40 engineers. Holds 12 patents in power tool motor design and battery technology.", imageUrl: "/images/team/vp-eng.jpg" },
  { _id: "tm-003", name: "Zhang Hao", role: "Head of Quality Assurance", department: "Quality", bio: "Manages ISO 9001 certified quality processes. Ensures every tool meets international safety and performance standards.", imageUrl: "/images/team/qa-head.jpg" },
  { _id: "tm-004", name: "Wang Jing", role: "Director of International Sales", department: "Sales", bio: "Manages B2B relationships across 60+ countries. Specializes in OEM partnerships and distributor networks.", imageUrl: "/images/team/sales-dir.jpg" },
  { _id: "tm-005", name: "Liu Feng", role: "Production Manager", department: "Manufacturing", bio: "Oversees daily operations of our 50,000 sqm manufacturing facility with a team of 500+ workers.", imageUrl: "/images/team/prod-mgr.jpg" },
  { _id: "tm-006", name: "Yang Xiao", role: "Chief Financial Officer", department: "Finance", bio: "15 years in manufacturing finance. Manages strategic partnerships and investment planning.", imageUrl: "/images/team/cfo.jpg" },
];

// --- Mock Certifications ---

export const mockCertifications: Certification[] = [
  { _id: "cert-001", name: "ISO 9001:2015", description: "Quality Management System certification ensuring consistent quality in manufacturing processes.", issuer: "SGS", validUntil: "2027-06-30", imageUrl: "/images/certs/iso9001.jpg" },
  { _id: "cert-002", name: "CE Marking", description: "European Conformity marking indicating compliance with EU health, safety, and environmental requirements.", issuer: "TUV Rheinland", validUntil: "2027-12-31", imageUrl: "/images/certs/ce.jpg" },
  { _id: "cert-003", name: "GS Certificate", description: "Tested Safety certificate for the German and European market, ensuring product safety compliance.", issuer: "TUV SUD", validUntil: "2027-03-15", imageUrl: "/images/certs/gs.jpg" },
  { _id: "cert-004", name: "UL Listed", description: "Underwriters Laboratories certification for North American safety standards compliance.", issuer: "UL LLC", validUntil: "2027-09-30", imageUrl: "/images/certs/ul.jpg" },
  { _id: "cert-005", name: "RoHS Compliant", description: "Restriction of Hazardous Substances directive compliance for environmental safety.", issuer: "Intertek", validUntil: "2028-01-01", imageUrl: "/images/certs/rohs.jpg" },
  { _id: "cert-006", name: "REACH Compliant", description: "Registration, Evaluation, Authorisation and Restriction of Chemicals regulation compliance.", issuer: "Bureau Veritas", validUntil: "2028-06-30", imageUrl: "/images/certs/reach.jpg" },
];

// --- Mock Analytics ---

export const mockAnalytics: AnalyticsSummary = {
  totalQuotes: 147,
  totalCustomers: 89,
  totalProducts: 17,
  quotesThisMonth: 23,
  topProducts: [
    { title: "SY-2100 Cordless Hammer Drill", quoteCount: 34 },
    { title: "SY-4100 Angle Grinder 125mm", quoteCount: 28 },
    { title: "SY-7100 Pro 5-Piece Combo Kit", quoteCount: 22 },
    { title: "SY-6100 Cordless Impact Wrench", quoteCount: 19 },
    { title: "SY-3100 Industrial Circular Saw", quoteCount: 15 },
  ],
  quotesByMonth: [
    { month: "Sep", count: 12 },
    { month: "Oct", count: 18 },
    { month: "Nov", count: 15 },
    { month: "Dec", count: 22 },
    { month: "Jan", count: 19 },
    { month: "Feb", count: 23 },
  ],
  customersByRegion: [
    { region: "Europe", count: 32 },
    { region: "North America", count: 18 },
    { region: "Southeast Asia", count: 15 },
    { region: "Middle East", count: 12 },
    { region: "South America", count: 7 },
    { region: "Africa", count: 5 },
  ],
};
