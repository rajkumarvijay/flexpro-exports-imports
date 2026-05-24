-- ============================================================
-- FlexPro Exports — Complete Database Setup
-- Run this in Supabase → SQL Editor
-- ============================================================

-- ─── ENUMS ───────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "RFQStatus" AS ENUM ('PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'COMPLETED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "MessageStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── TABLES ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "features" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatar" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "image" TEXT,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "rfqs" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "productRequired" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "message" TEXT,
    "status" "RFQStatus" NOT NULL DEFAULT 'PENDING',
    "quotedAmount" DOUBLE PRECISION,
    "quotedCurrency" TEXT DEFAULT 'INR',
    "adminNotes" TEXT,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rfqs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "payments" (
    "id" TEXT NOT NULL,
    "rfq_id" TEXT NOT NULL,
    "razorpay_order_id" TEXT,
    "razorpay_payment_id" TEXT,
    "razorpay_signature" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- ─── INDEXES ─────────────────────────────────────────────────

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_key" ON "accounts"("provider", "provider_account_id");
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_session_token_key" ON "sessions"("session_token");
CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_key" ON "verification_tokens"("identifier", "token");
CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_key" ON "blog_posts"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "payments_rfq_id_key" ON "payments"("rfq_id");
CREATE UNIQUE INDEX IF NOT EXISTS "payments_razorpay_order_id_key" ON "payments"("razorpay_order_id");
CREATE UNIQUE INDEX IF NOT EXISTS "payments_razorpay_payment_id_key" ON "payments"("razorpay_payment_id");

-- ─── FOREIGN KEYS ────────────────────────────────────────────

DO $$ BEGIN
  ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "payments" ADD CONSTRAINT "payments_rfq_id_fkey"
    FOREIGN KEY ("rfq_id") REFERENCES "rfqs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── SEED DATA ───────────────────────────────────────────────

-- Admin user  (password: Admin@12345)
INSERT INTO "users" ("id", "name", "email", "password", "role", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'FlexPro Admin',
  'admin@flexproexports.com',
  '$2b$10$prNLcJA8hmlZVgnZTCOk3.fCI5wkcFng35dhW1k7dkQgzzYGrcQI.',
  'ADMIN',
  NOW()
)
ON CONFLICT ("email") DO NOTHING;

-- Demo customer  (password: Customer@123)
INSERT INTO "users" ("id", "name", "email", "password", "role", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'Demo Customer',
  'customer@example.com',
  '$2b$10$L/xzYb23TCyQ9rTqqYIOBOhj0o/e3L0xRESQSZDU5hvPje/ur3xzq',
  'CUSTOMER',
  NOW()
)
ON CONFLICT ("email") DO NOTHING;

-- Services
DELETE FROM "services";
INSERT INTO "services" ("id", "title", "description", "icon", "features", "order", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Export Solutions',       'End-to-end export management covering documentation, compliance, freight coordination, and international delivery to 45+ countries.',                                     'Ship',        ARRAY['Custom export documentation','Freight coordination','Compliance management','Port handling'],         1, NOW()),
  (gen_random_uuid()::text, 'Import Assistance',      'Streamlined import services handling customs clearance, duty optimization, and last-mile delivery for businesses worldwide.',                                           'PackageOpen', ARRAY['Customs clearance','Duty optimization','Last-mile delivery','Import permits'],                          2, NOW()),
  (gen_random_uuid()::text, 'Global Sourcing',        'Connect with verified manufacturers and suppliers globally. We evaluate, negotiate, and manage supplier relationships on your behalf.',                                  'Globe',       ARRAY['Supplier discovery','Quality audits','Price negotiation','Ongoing management'],                          3, NOW()),
  (gen_random_uuid()::text, 'Logistics Coordination', 'Multi-modal logistics solutions including sea freight, air cargo, and road transport with real-time tracking and insurance.',                                            'Truck',       ARRAY['Sea & air freight','Real-time tracking','Cargo insurance','Warehouse solutions'],                          4, NOW()),
  (gen_random_uuid()::text, 'Customs Documentation',  'Expert preparation of all trade documents — commercial invoices, bills of lading, certificates of origin, and compliance filings.',                                     'FileCheck',   ARRAY['HS code classification','Commercial invoices','Certificates of origin','Regulatory filings'],             5, NOW()),
  (gen_random_uuid()::text, 'Supplier Verification',  'Rigorous due-diligence on potential suppliers including factory audits, financial checks, and product quality testing.',                                                 'ShieldCheck', ARRAY['Factory audits','Financial due diligence','Product testing','Background checks'],                          6, NOW());

-- Products
DELETE FROM "products";
INSERT INTO "products" ("id", "title", "category", "description", "featured", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Basmati Rice',        'Agricultural',  'Premium long-grain basmati rice sourced from the finest farms in India. Available in bulk quantities.',                               true,  NOW()),
  (gen_random_uuid()::text, 'Turmeric & Spices',   'Spices',        'Curcumin-rich turmeric and a full range of Indian spices — whole, ground, and blended.',                                             true,  NOW()),
  (gen_random_uuid()::text, 'Cotton Fabric',       'Textiles',      'High-quality woven and knitted cotton fabrics for garment manufacturing, available in custom specifications.',                        false, NOW()),
  (gen_random_uuid()::text, 'Industrial Machinery','Industrial',    'Heavy-duty industrial equipment including presses, lathes, and CNC machines from certified manufacturers.',                           false, NOW()),
  (gen_random_uuid()::text, 'Processed Foods',     'Food Products', 'Ready-to-eat and processed food products meeting international food safety and hygiene standards.',                                   false, NOW()),
  (gen_random_uuid()::text, 'Iron Ore & Minerals', 'Raw Materials', 'High-grade iron ore, granite, and mineral raw materials for industrial applications globally.',                                       false, NOW()),
  (gen_random_uuid()::text, 'Wheat & Grains',      'Agricultural',  'Non-GMO wheat, sorghum, and specialty grains meeting global export quality benchmarks.',                                              false, NOW()),
  (gen_random_uuid()::text, 'Cardamom & Pepper',   'Spices',        'Premium-grade cardamom, black pepper, and cumin packed to international export standards.',                                           true,  NOW()),
  (gen_random_uuid()::text, 'Denim & Synthetics',  'Textiles',      'Denim fabric and synthetic blends for fashion and workwear manufacturers worldwide.',                                                 false, NOW());

-- Testimonials
DELETE FROM "testimonials";
INSERT INTO "testimonials" ("id", "name", "role", "company", "country", "review", "rating", "avatar") VALUES
  (gen_random_uuid()::text, 'James Whitmore',   'Head of Procurement',   'Whitmore Industrial Group', 'United Kingdom', 'FlexPro has transformed our supply chain. Their supplier verification process and on-time delivery gave us complete confidence in scaling our imports from India. Highly professional team.',                                                         5, 'JW'),
  (gen_random_uuid()::text, 'Fatima Al-Rashid', 'CEO',                   'Gulf Trade Partners LLC',   'UAE',            'Working with FlexPro for 3 years has been exceptional. Their knowledge of customs documentation and regulatory compliance saved us from costly delays multiple times.',                                                                               5, 'FA'),
  (gen_random_uuid()::text, 'Michael Chen',     'Supply Chain Director', 'Pacific Rim Imports',       'Singapore',      'Outstanding logistics coordination and sourcing expertise. FlexPro found us suppliers we could not locate through other channels and negotiated pricing 18% below our previous benchmarks.',                                                        5, 'MC'),
  (gen_random_uuid()::text, 'Sarah Mitchell',   'Operations Manager',    'Mitchell & Co Exports',     'Australia',      'The customs documentation team at FlexPro is second to none. Complex Australian import requirements handled seamlessly every shipment.',                                                                                                           5, 'SM'),
  (gen_random_uuid()::text, 'Rolf Brecker',     'Purchasing Director',   'Brecker GmbH',              'Germany',        'We have tried multiple trade partners but FlexPro stands apart for their transparency and attention to compliance. Our textile imports arrive on schedule and within specification.',                                                               5, 'RB');

-- Blog posts
DELETE FROM "blog_posts";
INSERT INTO "blog_posts" ("id", "title", "excerpt", "content", "date", "category", "readTime", "slug", "published", "updatedAt") VALUES
  (gen_random_uuid()::text, 'How to Choose the Right Export Partner for Your Business',   'A comprehensive guide to evaluating international trade partners — what to look for, red flags to avoid, and how to structure agreements.',                                                       '<p>Choosing the right export partner is one of the most critical decisions for any business entering international trade...</p>', '2026-05-10', 'Trade Strategy', '6 min read', 'choose-right-export-partner',        true, NOW()),
  (gen_random_uuid()::text, 'Understanding India''s APEDA Regulations for Food Exports', 'Everything exporters need to know about APEDA registration, product categories, and documentation requirements for agricultural exports.',                                                          '<p>APEDA (Agricultural and Processed Food Products Export Development Authority) is the body responsible for...</p>',            '2026-04-22', 'Compliance',     '8 min read', 'apeda-regulations-food-exports',      true, NOW()),
  (gen_random_uuid()::text, 'Top 5 Logistics Trends Shaping Global Trade in 2026',       'From AI-driven freight optimization to green shipping corridors — the logistics innovations redefining international supply chains.',                                                               '<p>The logistics industry is undergoing rapid transformation in 2026...</p>',                                                     '2026-04-05', 'Logistics',      '5 min read', 'logistics-trends-2026',               true, NOW()),
  (gen_random_uuid()::text, 'Customs Documentation: A Complete Checklist for Importers', 'Avoid costly delays with our definitive checklist of customs documents required for smooth clearance across major markets.',                                                                        '<p>Customs documentation errors are among the leading causes of shipment delays...</p>',                                          '2026-03-18', 'Compliance',     '7 min read', 'customs-documentation-checklist',     true, NOW());

-- Demo RFQ linked to demo customer
DO $$
DECLARE
  v_customer_id TEXT;
BEGIN
  SELECT id INTO v_customer_id FROM "users" WHERE email = 'customer@example.com';
  IF v_customer_id IS NOT NULL THEN
    INSERT INTO "rfqs" (
      "id", "fullName", "companyName", "country", "productRequired", "quantity",
      "email", "whatsapp", "message", "status", "quotedAmount", "quotedCurrency",
      "adminNotes", "user_id", "updatedAt"
    ) VALUES (
      'demo-rfq-001',
      'Demo Customer',
      'Demo Corp',
      'India',
      'Basmati Rice',
      '10 MT',
      'customer@example.com',
      '+91 9000000000',
      'Looking for premium basmati rice for export.',
      'QUOTED',
      45000,
      'INR',
      'Quote prepared at ₹4,500/MT for 10 MT. Valid for 30 days.',
      v_customer_id,
      NOW()
    )
    ON CONFLICT ("id") DO NOTHING;
  END IF;
END $$;

-- ─── DONE ────────────────────────────────────────────────────
SELECT 'FlexPro database setup complete' AS status;
