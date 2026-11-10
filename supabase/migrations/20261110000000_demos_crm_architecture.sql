-- ====================================================================
-- STARX ALPHA LABS — ENTERPRISE DEMO PLATFORM & CRM DATABASE SCHEMA
-- Normalized 26 Tables, Row Level Security (RLS), Audit Logging & Seeds
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. USERS, ROLES & PERMISSIONS
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.customer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(200),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    industry VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(100) DEFAULT 'Engineering',
    role_level VARCHAR(50) DEFAULT 'Architect',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEMO CATEGORIES & 160 DEMO MODELS
CREATE TABLE IF NOT EXISTS public.demo_categories (
    id SERIAL PRIMARY KEY,
    category_number INT UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    icon_name VARCHAR(50),
    gradient VARCHAR(100),
    model_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_models (
    id INT PRIMARY KEY,
    category_id INT REFERENCES public.demo_categories(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    suitable_for TEXT NOT NULL,
    development_type VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    estimated_development_time VARCHAR(50) NOT NULL,
    indicative_starting_price VARCHAR(50) NOT NULL,
    indicative_price_usd VARCHAR(50) NOT NULL,
    availability_status VARCHAR(50) DEFAULT 'Live Demo',
    is_ai_enabled BOOLEAN DEFAULT FALSE,
    is_ecommerce BOOLEAN DEFAULT FALSE,
    is_erp_crm BOOLEAN DEFAULT FALSE,
    is_free_demo_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 4.90,
    offline_ready BOOLEAN DEFAULT TRUE,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    main_features JSONB DEFAULT '[]'::jsonb,
    modules JSONB DEFAULT '[]'::jsonb,
    sample_roles JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id INT REFERENCES public.demo_models(id) ON DELETE CASCADE,
    feature_title VARCHAR(200) NOT NULL,
    feature_description TEXT,
    is_core BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.demo_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id INT REFERENCES public.demo_models(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    is_thumbnail BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.demo_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id INT REFERENCES public.demo_models(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    duration VARCHAR(20),
    thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS public.demo_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id INT REFERENCES public.demo_models(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    sample_email VARCHAR(200) NOT NULL,
    password_hint VARCHAR(100) NOT NULL,
    permissions JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.demo_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id INT REFERENCES public.demo_models(id) ON DELETE CASCADE,
    session_id VARCHAR(100),
    ip_hash VARCHAR(64),
    role_accessed VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LEADS, ENQUIRIES & CRM
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    business_name VARCHAR(200),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    industry VARCHAR(100),
    selected_demo_id INT REFERENCES public.demo_models(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'New', -- New, Contacted, Qualified, Demo Scheduled, Quotation Sent, Negotiation, Converted, Lost
    assigned_salesperson VARCHAR(100),
    source VARCHAR(100) DEFAULT 'Website Showcase',
    estimated_budget VARCHAR(100),
    target_delivery_date VARCHAR(100),
    preferred_contact_method VARCHAR(50) DEFAULT 'WhatsApp',
    notes JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    demo_id INT REFERENCES public.demo_models(id) ON DELETE SET NULL,
    required_features JSONB DEFAULT '[]'::jsonb,
    project_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. QUOTATIONS & LINE ITEMS
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_number VARCHAR(50) UNIQUE NOT NULL,
    client_name VARCHAR(150) NOT NULL,
    client_business VARCHAR(200),
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    selected_solution VARCHAR(255) NOT NULL,
    project_scope TEXT NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL,
    tax_rate NUMERIC(4,2) DEFAULT 0.18,
    tax_amount NUMERIC(12,2) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    payment_schedule TEXT NOT NULL,
    delivery_timeline VARCHAR(100) NOT NULL,
    terms_and_conditions JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'Sent', -- Draft, Sent, Approved, Rejected, Modification Requested
    customer_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- Development, Hosting & Cloud, Integrations, Maintenance
    title VARCHAR(200) NOT NULL,
    description TEXT,
    amount NUMERIC(12,2) NOT NULL
);

-- 6. PROJECTS & 8-STAGE MILESTONES
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_code VARCHAR(50) UNIQUE NOT NULL,
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    client_business VARCHAR(200),
    client_email VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    current_stage VARCHAR(50) DEFAULT 'Requirement Gathering',
    progress_percent INT DEFAULT 12,
    start_date DATE DEFAULT CURRENT_DATE,
    target_handover_date DATE,
    status VARCHAR(50) DEFAULT 'Active',
    total_budget NUMERIC(12,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    stage VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completion_date DATE,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS public.project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BILLING, PAYMENTS & SUPPORT
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Paid, Overdue
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    amount NUMERIC(12,2) NOT NULL,
    gateway VARCHAR(50) DEFAULT 'Razorpay',
    transaction_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Success',
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    client_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'Medium',
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_email VARCHAR(255) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id VARCHAR(100),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.website_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    content_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.demo_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view demo catalog
CREATE POLICY "Public read demo categories" ON public.demo_categories FOR SELECT USING (true);
CREATE POLICY "Public read demo models" ON public.demo_models FOR SELECT USING (true);

-- Public can create enquiries
CREATE POLICY "Public create leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Admins full access
CREATE POLICY "Admin full manage demo models" ON public.demo_models USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full manage quotations" ON public.quotations USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full manage projects" ON public.projects USING (auth.jwt() ->> 'role' = 'admin');

-- Customers can view their own quotations and projects
CREATE POLICY "Customer view their own quotations" ON public.quotations FOR SELECT USING (client_email = auth.jwt() ->> 'email');
CREATE POLICY "Customer view their own projects" ON public.projects FOR SELECT USING (client_email = auth.jwt() ->> 'email');
