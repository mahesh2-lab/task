-- Supabase SQL to create the property_tax_records table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.property_tax_records (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    -- General Information
    gram_panchayat TEXT NOT NULL,
    village TEXT NOT NULL,
    janpad_panchayat TEXT,
    district TEXT,
    
    -- Property Details
    serial_number TEXT,
    address TEXT,
    member_id TEXT,
    asset_number TEXT,
    owner_name TEXT NOT NULL,
    consumer_name TEXT NOT NULL,
    asset_details TEXT,
    construction_year INTEGER,
    
    -- Valuation Details
    area_per_sqft NUMERIC DEFAULT 0,
    land_value NUMERIC DEFAULT 0,
    building_value NUMERIC DEFAULT 0,
    construction_value NUMERIC DEFAULT 0,
    depreciation_rate NUMERIC DEFAULT 0,
    intended_use TEXT,
    after_depreciation_value NUMERIC DEFAULT 0,
    taxable_value NUMERIC DEFAULT 0,
    
    -- Tax Details
    property_tax NUMERIC DEFAULT 0,
    light_tax NUMERIC DEFAULT 0,
    cleaning_tax NUMERIC DEFAULT 0,
    water_tax NUMERIC DEFAULT 0,
    total_annual NUMERIC DEFAULT 0,
    appeal_property_tax NUMERIC DEFAULT 0,
    appeal_light_tax NUMERIC DEFAULT 0,
    appeal_cleaning_tax NUMERIC DEFAULT 0,
    appeal_water_tax NUMERIC DEFAULT 0,
    total_appeal NUMERIC DEFAULT 0,
    
    -- Additional Information
    remarks TEXT,
    has_toilet BOOLEAN DEFAULT false,
    chaturmasi TEXT,
    east_boundary TEXT,
    west_boundary TEXT,
    north_boundary TEXT,
    south_boundary TEXT
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS property_tax_records_updated_at ON public.property_tax_records;
CREATE TRIGGER property_tax_records_updated_at
    BEFORE UPDATE ON public.property_tax_records
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS property_tax_records_owner_name_idx ON public.property_tax_records(owner_name);
CREATE INDEX IF NOT EXISTS property_tax_records_gram_panchayat_idx ON public.property_tax_records(gram_panchayat);
CREATE INDEX IF NOT EXISTS property_tax_records_created_at_idx ON public.property_tax_records(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.property_tax_records ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can make this more restrictive)
DROP POLICY IF EXISTS "Allow all operations" ON public.property_tax_records;
CREATE POLICY "Allow all operations" ON public.property_tax_records
FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.property_tax_records TO anon;
GRANT ALL ON public.property_tax_records TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.property_tax_records_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.property_tax_records_id_seq TO authenticated;
