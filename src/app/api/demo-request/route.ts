import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  city: z.string().min(2, "City is required"),
  industry: z.string().min(2, "Industry is required"),
  solutionType: z.string().min(2, "Solution type is required"),
  currentWebsite: z.string().optional().nullable(),
  primaryGoal: z.string().min(2, "Primary goal is required"),
  estimatedBudget: z.string().min(2, "Estimated budget is required"),
  targetTimeline: z.string().min(2, "Target timeline is required"),
  projectDetails: z.string().min(10, "Please provide at least 10 characters of details"),
  website_hp: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot check (Eliminates automated bot submissions silently)
    if (body.website_hp && body.website_hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        requestCode: "DEMO-" + Math.floor(10000 + Math.random() * 90000),
        message: "Request received successfully.",
      });
    }

    // 2. Validate payload
    const parsed = demoRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 3. Generate Request Code: DEMO-XXXXX
    const requestCode = `DEMO-${Math.floor(10000 + Math.random() * 90000)}`;

    // 4. Generate Pre-filled WhatsApp Follow-Up Link
    const waText = `Hello StarX Alpha Labs Team! I have requested a Free Personalized Demo for my business.
Request ID: ${requestCode}
Name: ${data.fullName}
Business: ${data.businessName} (${data.city})
Industry: ${data.industry}
Solution: ${data.solutionType}
Timeline: ${data.targetTimeline}`;

    const whatsappUrl = `https://wa.me/919660937033?text=${encodeURIComponent(waText)}`;

    // 5. Database Persistence (Supabase demo_requests table)
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
                // Ignore in read-only cookie contexts
              }
            },
          },
        });

        await supabase.from("demo_requests").insert({
          request_code: requestCode,
          full_name: data.fullName,
          business_name: data.businessName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          industry: data.industry,
          solution_type: data.solutionType,
          current_website: data.currentWebsite || null,
          primary_goal: data.primaryGoal,
          estimated_budget: data.estimatedBudget,
          target_timeline: data.targetTimeline,
          project_details: data.projectDetails,
          status: "pending",
        });
      }
    } catch (dbErr) {
      console.warn("[DEMO_REQUEST_DB_WARN] Could not insert to Supabase, continuing:", dbErr);
    }

    return NextResponse.json({
      success: true,
      requestCode,
      whatsappUrl,
      message: "Personalized demo request registered successfully! Our team will build and share your interactive demo within 24–48 hours.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process request";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
