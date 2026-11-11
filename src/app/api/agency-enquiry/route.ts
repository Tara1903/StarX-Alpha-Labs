import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const agencySchema = z.object({
  agencyName: z.string().min(2, "Agency name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid business email is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  website: z.string().optional().nullable(),
  country: z.string().min(2, "Country/Location is required"),
  clientVolume: z.string().min(1, "Client volume selection is required"),
  servicesNeeded: z.array(z.string()).default([]),
  partnershipModel: z.string().min(2, "Partnership model is required"),
  message: z.string().optional().nullable(),
  website_hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.website_hp && body.website_hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Partnership enquiry received successfully.",
      });
    }

    const parsed = agencySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Supabase insertion
    try {
      const cookieStore = await cookies();
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createServerClient(supabaseUrl, supabaseKey, {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // Ignore
              }
            },
          },
        });

        await supabase.from("agency_partnerships").insert({
          agency_name: data.agencyName,
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          website: data.website || null,
          country: data.country,
          client_volume: data.clientVolume,
          services_needed: data.servicesNeeded,
          partnership_model: data.partnershipModel,
          message: data.message || null,
          status: "new",
        });
      }
    } catch (dbErr) {
      console.warn("[AGENCY_PARTNERSHIP_DB_WARN] Could not insert to Supabase, continuing:", dbErr);
    }

    const waText = `Hello Hari Singh & StarX Alpha Labs! I am contacting you regarding an Agency White-Label Partnership.
Agency: ${data.agencyName}
Contact: ${data.contactName}
Model: ${data.partnershipModel}
Volume: ${data.clientVolume}
Location: ${data.country}`;

    const whatsappUrl = `https://wa.me/919660937033?text=${encodeURIComponent(waText)}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: "Agency partnership enquiry registered! Our partnerships director will connect within 24 hours.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process enquiry";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
