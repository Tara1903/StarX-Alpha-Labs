import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().trim().email('Please enter a valid corporate email address').max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  division: z.string().trim().max(50).optional().or(z.literal('')),
  message: z.string().trim().min(15, 'Please provide at least 15 characters of project context').max(5000, 'Message cannot exceed 5000 characters'),
  sourcePage: z.string().trim().max(255).default('/contact'),
  // Honeypot field (must remain empty for human submissions)
  website_hp: z.string().optional(),
});

export const QuoteFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid corporate email address').max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  serviceSlug: z.string().trim().max(100).optional().or(z.literal('')),
  budgetRange: z.string().trim().max(50).optional().or(z.literal('')),
  timeline: z.string().trim().max(50).optional().or(z.literal('')),
  projectDetails: z.string().trim().min(15, 'Please provide at least 15 characters describing your requirements').max(5000),
  website_hp: z.string().optional(),
});

export const ConsultationFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid corporate email address').max(255),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  preferredDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date (YYYY-MM-DD)').optional().or(z.literal('')),
  preferredTime: z.string().trim().max(50).optional().or(z.literal('')),
  topic: z.string().trim().max(150).optional().or(z.literal('')),
  notes: z.string().trim().max(3000).optional().or(z.literal('')),
  website_hp: z.string().optional(),
});

export const NewsletterFormSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(255),
  website_hp: z.string().optional(),
});
