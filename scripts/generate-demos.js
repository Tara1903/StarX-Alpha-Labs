const fs = require('fs');
const path = require('path');

const RAW_DEMOS = [
  // CATEGORY 1 – RESTAURANT, FOOD & HOSPITALITY (1-15)
  { id: 1, catNum: 1, name: "Restaurant Website", devType: "Website", platform: "Website", price: "₹24,999", usd: "$349", time: "1-2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 2, catNum: 1, name: "Online Food Ordering", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 3, catNum: 1, name: "Cloud Kitchen", devType: "SaaS Platform", platform: "Web App", price: "₹49,999", usd: "$699", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 4, catNum: 1, name: "Multi-Restaurant Food App", devType: "Web App", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "4-6 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 5, catNum: 1, name: "Food Delivery App", devType: "Mobile App", platform: "Mobile App", price: "₹69,999", usd: "$949", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 6, catNum: 1, name: "Restaurant POS", devType: "Cloud ERP", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 7, catNum: 1, name: "Cafe & Coffee Shop", devType: "Web App", platform: "Web App", price: "₹29,999", usd: "$419", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 8, catNum: 1, name: "Bakery & Cake Shop", devType: "Web App", platform: "Web App", price: "₹34,999", usd: "$489", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 9, catNum: 1, name: "Sweet Shop", devType: "Web App", platform: "Web App", price: "₹32,999", usd: "$459", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 10, catNum: 1, name: "Catering Management", devType: "Cloud ERP", platform: "Web App", price: "₹54,999", usd: "$769", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 11, catNum: 1, name: "Tiffin & Meal Subscription", devType: "Web App", platform: "Web App", price: "₹42,999", usd: "$599", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 12, catNum: 1, name: "Grocery & Supermarket", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 13, catNum: 1, name: "Fruits & Vegetables Store", devType: "Web App", platform: "Web App", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 14, catNum: 1, name: "Dairy & Milk Subscription", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 15, catNum: 1, name: "Food Franchise Management", devType: "Cloud ERP", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-6 Weeks", ecommerce: false, erpCrm: true, ai: false },

  // CATEGORY 2 – E-COMMERCE & RETAIL (16-35)
  { id: 16, catNum: 2, name: "General E-commerce Store", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 17, catNum: 2, name: "Multi-Vendor Marketplace", devType: "SaaS Platform", platform: "Web App", price: "₹99,999", usd: "$1,399", time: "5-7 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 18, catNum: 2, name: "Fashion & Clothing Store", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 19, catNum: 2, name: "Electronics Store", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 20, catNum: 2, name: "Mobile Accessories Store", devType: "Web App", platform: "Web App", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 21, catNum: 2, name: "Beauty & Cosmetics Store", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 22, catNum: 2, name: "Ayurvedic & Wellness Store", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 23, catNum: 2, name: "Furniture Store", devType: "Web App", platform: "Web App", price: "₹54,999", usd: "$769", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 24, catNum: 2, name: "Jewellery Store", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 25, catNum: 2, name: "Footwear Store", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 26, catNum: 2, name: "Grocery E-commerce", devType: "Web App", platform: "Web App", price: "₹54,999", usd: "$769", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 27, catNum: 2, name: "Wholesale / B2B Portal", devType: "Cloud ERP", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 28, catNum: 2, name: "Dropshipping Store", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 29, catNum: 2, name: "Subscription Commerce", devType: "SaaS Platform", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 30, catNum: 2, name: "Digital Products Store", devType: "Web App", platform: "Web App", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 31, catNum: 2, name: "Local Shop Online Store", devType: "Web App", platform: "Web App", price: "₹29,999", usd: "$419", time: "1-2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 32, catNum: 2, name: "D2C Brand Website", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 33, catNum: 2, name: "Rental Marketplace", devType: "SaaS Platform", platform: "Web App", price: "₹84,999", usd: "$1,189", time: "4-6 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 34, catNum: 2, name: "Pharmacy Store Demo", devType: "Web App", platform: "Web App", price: "₹54,999", usd: "$769", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 35, catNum: 2, name: "Building Materials Store", devType: "Web App", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },

  // CATEGORY 3 – EDUCATION, COACHING & TRAINING (36-50)
  { id: 36, catNum: 3, name: "Coaching Institute Website", devType: "Website", platform: "Website", price: "₹24,999", usd: "$349", time: "1-2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 37, catNum: 3, name: "Coaching Management ERP", devType: "Cloud ERP", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 38, catNum: 3, name: "Online Learning LMS", devType: "SaaS Platform", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 39, catNum: 3, name: "School Management ERP", devType: "Cloud ERP", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "5-6 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 40, catNum: 3, name: "College Management System", devType: "Cloud ERP", platform: "Web App", price: "₹1,19,999", usd: "$1,699", time: "6-8 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 41, catNum: 3, name: "Tuition Centre Management", devType: "Cloud ERP", platform: "Web App", price: "₹39,999", usd: "$549", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 42, catNum: 3, name: "Test Preparation Platform", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 43, catNum: 3, name: "Online Examination System", devType: "Web App", platform: "Web App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 44, catNum: 3, name: "Quiz & Assessment Platform", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: false, erpCrm: false, ai: true },
  { id: 45, catNum: 3, name: "Language Learning Platform", devType: "Web App", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 46, catNum: 3, name: "Skill Development Portal", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 47, catNum: 3, name: "Corporate Training LMS", devType: "SaaS Platform", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 48, catNum: 3, name: "Teacher Management Portal", devType: "Cloud ERP", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 49, catNum: 3, name: "Student Counselling Portal", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 50, catNum: 3, name: "Digital Library", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: false, ai: true },

  // CATEGORY 4 – HEALTHCARE & WELLNESS (51-65)
  { id: 51, catNum: 4, name: "Hospital Website", devType: "Website", platform: "Website", price: "₹29,999", usd: "$419", time: "1-2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 52, catNum: 4, name: "Hospital Management ERP", devType: "Cloud ERP", platform: "Web App", price: "₹1,49,999", usd: "$2,099", time: "6-8 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 53, catNum: 4, name: "Clinic Management", devType: "Cloud ERP", platform: "Web App", price: "₹54,999", usd: "$769", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 54, catNum: 4, name: "Doctor Appointment App", devType: "Mobile App", platform: "Mobile App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 55, catNum: 4, name: "Diagnostic Lab Portal", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 56, catNum: 4, name: "Pharmacy Management", devType: "Cloud ERP", platform: "Web App", price: "₹49,999", usd: "$699", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 57, catNum: 4, name: "Telemedicine Platform", devType: "SaaS Platform", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 58, catNum: 4, name: "Dental Clinic Software", devType: "Cloud ERP", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 59, catNum: 4, name: "Physiotherapy Centre", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 60, catNum: 4, name: "Fitness & Gym Management", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 61, catNum: 4, name: "Yoga & Wellness Studio", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 62, catNum: 4, name: "Nutrition Consultation Portal", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 63, catNum: 4, name: "Salon & Spa Management", devType: "Web App", platform: "Web App", price: "₹42,999", usd: "$599", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 64, catNum: 4, name: "Medical Inventory System", devType: "Cloud ERP", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 65, catNum: 4, name: "Patient Portal", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },

  // CATEGORY 5 – BUSINESS, CRM & ENTERPRISE (66-85)
  { id: 66, catNum: 5, name: "CRM Software", devType: "SaaS Platform", platform: "Web App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 67, catNum: 5, name: "ERP Software", devType: "Cloud ERP", platform: "Web App", price: "₹1,29,999", usd: "$1,799", time: "6-8 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 68, catNum: 5, name: "Billing & Invoicing", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 69, catNum: 5, name: "Inventory Management", devType: "Cloud ERP", platform: "Web App", price: "₹54,999", usd: "$769", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 70, catNum: 5, name: "HR & Payroll", devType: "Cloud ERP", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 71, catNum: 5, name: "Attendance Management", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 72, catNum: 5, name: "Project Management", devType: "SaaS Platform", platform: "Web App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 73, catNum: 5, name: "Task Management", devType: "Web App", platform: "Web App", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 74, catNum: 5, name: "Sales Management", devType: "Cloud ERP", platform: "Web App", price: "₹54,999", usd: "$769", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 75, catNum: 5, name: "Purchase Management", devType: "Cloud ERP", platform: "Web App", price: "₹54,999", usd: "$769", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 76, catNum: 5, name: "Accounting Dashboard", devType: "Cloud ERP", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 77, catNum: 5, name: "Warehouse Management", devType: "Cloud ERP", platform: "Web App", price: "₹84,999", usd: "$1,189", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 78, catNum: 5, name: "Franchise Management", devType: "Cloud ERP", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 79, catNum: 5, name: "Distributor Management", devType: "Cloud ERP", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 80, catNum: 5, name: "Field Staff Management", devType: "Mobile App", platform: "Mobile App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 81, catNum: 5, name: "Customer Support CRM", devType: "SaaS Platform", platform: "Web App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 82, catNum: 5, name: "Document Management", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 83, catNum: 5, name: "Subscription Management", devType: "SaaS Platform", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 84, catNum: 5, name: "Appointment Management", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 85, catNum: 5, name: "Business Analytics", devType: "SaaS Platform", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },

  // CATEGORY 6 – REAL ESTATE, CONSTRUCTION & HOSPITALITY (86-97)
  { id: 86, catNum: 6, name: "Real Estate Website", devType: "Website", platform: "Website", price: "₹29,999", usd: "$419", time: "1-2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 87, catNum: 6, name: "Real Estate CRM", devType: "SaaS Platform", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 88, catNum: 6, name: "Construction Management", devType: "Cloud ERP", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 89, catNum: 6, name: "Architecture Studio", devType: "Website", platform: "Website", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 90, catNum: 6, name: "Interior Design Website", devType: "Website", platform: "Website", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 91, catNum: 6, name: "Travel Agency", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 92, catNum: 6, name: "Hotel Booking Website", devType: "Web App", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 93, catNum: 6, name: "Car Rental System", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 94, catNum: 6, name: "Taxi Booking App", devType: "Mobile App", platform: "Mobile App", price: "₹84,999", usd: "$1,189", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 95, catNum: 6, name: "Logistics Management", devType: "Cloud ERP", platform: "Web App", price: "₹94,999", usd: "$1,319", time: "4-6 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 96, catNum: 6, name: "Courier Management", devType: "Cloud ERP", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 97, catNum: 6, name: "Event Management", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },

  // CATEGORY 7 – PROFESSIONAL & LOCAL SERVICES (98-110)
  { id: 98, catNum: 7, name: "Repair & Service Management", devType: "Cloud ERP", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 99, catNum: 7, name: "Cleaning Service Portal", devType: "Web App", platform: "Web App", price: "₹42,999", usd: "$599", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 100, catNum: 7, name: "Wedding Planner Portal", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 101, catNum: 7, name: "Photography Studio", devType: "Website", platform: "Website", price: "₹29,999", usd: "$419", time: "1-2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 102, catNum: 7, name: "Legal Firm Website", devType: "Website", platform: "Website", price: "₹34,999", usd: "$489", time: "2 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 103, catNum: 7, name: "CA & Accounting Firm", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 104, catNum: 7, name: "Insurance Agency CRM", devType: "SaaS Platform", platform: "Web App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 105, catNum: 7, name: "Recruitment & Job Portal", devType: "SaaS Platform", platform: "Web App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 106, catNum: 7, name: "Freelance Marketplace", devType: "SaaS Platform", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 107, catNum: 7, name: "Laundry Management", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 108, catNum: 7, name: "Security Agency Management", devType: "Cloud ERP", platform: "Web App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 109, catNum: 7, name: "Pest Control Booking", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 110, catNum: 7, name: "Coaching & Consultancy CRM", devType: "SaaS Platform", platform: "Web App", price: "₹54,999", usd: "$769", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },

  // CATEGORY 8 – MANUFACTURING, INDUSTRIAL & WHOLESALE (111-120)
  { id: 111, catNum: 8, name: "Manufacturing ERP", devType: "Cloud ERP", platform: "Web App", price: "₹1,49,999", usd: "$2,099", time: "6-8 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 112, catNum: 8, name: "Production Planning System", devType: "Cloud ERP", platform: "Web App", price: "₹94,999", usd: "$1,319", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 113, catNum: 8, name: "Factory Management", devType: "Cloud ERP", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 114, catNum: 8, name: "Quality Control System", devType: "Web App", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 115, catNum: 8, name: "Raw Material Inventory", devType: "Cloud ERP", platform: "Web App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 116, catNum: 8, name: "Industrial B2B Marketplace", devType: "SaaS Platform", platform: "Web App", price: "₹1,09,999", usd: "$1,529", time: "5-6 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 117, catNum: 8, name: "Dealer & Distributor Portal", devType: "Cloud ERP", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 118, catNum: 8, name: "Supplier Management", devType: "Cloud ERP", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 119, catNum: 8, name: "Procurement Software", devType: "Cloud ERP", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 120, catNum: 8, name: "Export-Import Portal", devType: "Web App", platform: "Web App", price: "₹84,999", usd: "$1,189", time: "4 Weeks", ecommerce: true, erpCrm: true, ai: false },

  // CATEGORY 9 – AI, AUTOMATION & ADVANCED TECHNOLOGY (121-135)
  { id: 121, catNum: 9, name: "AI Customer Support Chatbot", devType: "AI Microservice", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 122, catNum: 9, name: "AI Sales Assistant", devType: "AI Microservice", platform: "Web App", price: "₹59,999", usd: "$829", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 123, catNum: 9, name: "WhatsApp Business Automation", devType: "SaaS Platform", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: true },
  { id: 124, catNum: 9, name: "AI Voice Assistant", devType: "AI Microservice", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 125, catNum: 9, name: "AI Document Assistant", devType: "AI Microservice", platform: "Web App", price: "₹54,999", usd: "$769", time: "2-3 Weeks", ecommerce: false, erpCrm: false, ai: true },
  { id: 126, catNum: 9, name: "AI Content Generator", devType: "SaaS Platform", platform: "Web App", price: "₹49,999", usd: "$699", time: "2 Weeks", ecommerce: false, erpCrm: false, ai: true },
  { id: 127, catNum: 9, name: "AI Image Generation Portal", devType: "SaaS Platform", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 128, catNum: 9, name: "AI Resume Screening", devType: "AI Microservice", platform: "Web App", price: "₹59,999", usd: "$829", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 129, catNum: 9, name: "AI Business Analytics", devType: "SaaS Platform", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 130, catNum: 9, name: "AI Knowledge Base", devType: "AI Microservice", platform: "Web App", price: "₹54,999", usd: "$769", time: "2-3 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 131, catNum: 9, name: "AI Appointment Assistant", devType: "AI Microservice", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 132, catNum: 9, name: "AI E-commerce Assistant", devType: "AI Microservice", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 133, catNum: 9, name: "Workflow Automation Platform", devType: "SaaS Platform", platform: "Web App", price: "₹99,999", usd: "$1,399", time: "4-5 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 134, catNum: 9, name: "Custom AI Agent Platform", devType: "SaaS Platform", platform: "Web App", price: "₹1,19,999", usd: "$1,699", time: "5-6 Weeks", ecommerce: false, erpCrm: true, ai: true },
  { id: 135, catNum: 9, name: "AI Education Assistant", devType: "AI Microservice", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: false, ai: true },

  // CATEGORY 10 – MEMBERSHIP & COMMUNITY PLATFORMS (136-143)
  { id: 136, catNum: 10, name: "Membership Platform", devType: "SaaS Platform", platform: "Web App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 137, catNum: 10, name: "Referral Management System", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 138, catNum: 10, name: "Loyalty & Rewards Platform", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 139, catNum: 10, name: "Online Community Portal", devType: "Web App", platform: "Web App", price: "₹54,999", usd: "$769", time: "3 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 140, catNum: 10, name: "Social Networking Platform", devType: "SaaS Platform", platform: "Web App", price: "₹99,999", usd: "$1,399", time: "5-6 Weeks", ecommerce: false, erpCrm: false, ai: true },
  { id: 141, catNum: 10, name: "Classified Ads Portal", devType: "Web App", platform: "Web App", price: "₹59,999", usd: "$829", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 142, catNum: 10, name: "Online Directory", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: false, ai: false },
  { id: 143, catNum: 10, name: "Crowdfunding Platform", devType: "SaaS Platform", platform: "Web App", price: "₹89,999", usd: "$1,249", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },

  // CATEGORY 11 – MEDIA, EVENTS & DIGITAL CONTENT (144-150)
  { id: 144, catNum: 11, name: "Donation Management Portal", devType: "Web App", platform: "Web App", price: "₹39,999", usd: "$549", time: "2 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 145, catNum: 11, name: "Job & Gig Marketplace", devType: "SaaS Platform", platform: "Web App", price: "₹84,999", usd: "$1,189", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 146, catNum: 11, name: "Video Learning Platform", devType: "SaaS Platform", platform: "Web App", price: "₹79,999", usd: "$1,099", time: "4 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 147, catNum: 11, name: "Webinar Platform", devType: "SaaS Platform", platform: "Web App", price: "₹74,999", usd: "$1,049", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 148, catNum: 11, name: "News & Media Portal", devType: "Web App", platform: "Web App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: false, erpCrm: false, ai: true },
  { id: 149, catNum: 11, name: "Digital Magazine Platform", devType: "Web App", platform: "Web App", price: "₹44,999", usd: "$629", time: "2 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 150, catNum: 11, name: "Event Ticket Booking", devType: "Web App", platform: "Web App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: true, erpCrm: true, ai: false },

  // CATEGORY 12 – MOBILE APPS & CUSTOMER PLATFORMS (151-160)
  { id: 151, catNum: 12, name: "Grocery Delivery App", devType: "Mobile App", platform: "Mobile App", price: "₹79,999", usd: "$1,099", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 152, catNum: 12, name: "Food Delivery App", devType: "Mobile App", platform: "Mobile App", price: "₹79,999", usd: "$1,099", time: "4-5 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 153, catNum: 12, name: "Shopping App", devType: "Mobile App", platform: "Mobile App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: false },
  { id: 154, catNum: 12, name: "Service Booking App", devType: "Mobile App", platform: "Mobile App", price: "₹64,999", usd: "$899", time: "3-4 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 155, catNum: 12, name: "Doctor Booking App", devType: "Mobile App", platform: "Mobile App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 156, catNum: 12, name: "Education App", devType: "Mobile App", platform: "Mobile App", price: "₹69,999", usd: "$969", time: "3-4 Weeks", ecommerce: true, erpCrm: false, ai: true },
  { id: 157, catNum: 12, name: "Employee App", devType: "Mobile App", platform: "Mobile App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 158, catNum: 12, name: "Delivery Partner App", devType: "Mobile App", platform: "Mobile App", price: "₹59,999", usd: "$829", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: false },
  { id: 159, catNum: 12, name: "Customer Loyalty App", devType: "Mobile App", platform: "Mobile App", price: "₹49,999", usd: "$699", time: "2-3 Weeks", ecommerce: true, erpCrm: true, ai: false },
  { id: 160, catNum: 12, name: "Business Owner App", devType: "Mobile App", platform: "Mobile App", price: "₹64,999", usd: "$899", time: "3 Weeks", ecommerce: false, erpCrm: true, ai: true },
];

const CATEGORY_MAP = {
  1: { name: "Restaurant, Food & Hospitality", slug: "restaurant-food" },
  2: { name: "E-Commerce & Retail", slug: "ecommerce-retail" },
  3: { name: "Education, Coaching & Training", slug: "education-training" },
  4: { name: "Healthcare & Wellness", slug: "healthcare-wellness" },
  5: { name: "Business, CRM & Enterprise", slug: "business-crm" },
  6: { name: "Real Estate, Construction & Hospitality", slug: "real-estate-hospitality" },
  7: { name: "Professional & Local Services", slug: "professional-services" },
  8: { name: "Manufacturing, Industrial & Wholesale", slug: "manufacturing-industrial" },
  9: { name: "AI, Automation & Advanced Technology", slug: "ai-automation" },
  10: { name: "Membership & Community Platforms", slug: "membership-community" },
  11: { name: "Media, Events & Digital Content", slug: "media-events" },
  12: { name: "Mobile Apps & Customer Platforms", slug: "mobile-apps" }
};

function slugify(name, id) {
  // Handle disambiguation for #152 Food Delivery App in mobile vs #5
  if (id === 152) return "food-delivery-app-mobile";
  return name.toLowerCase()
    .replace(/[\/&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFeaturesForDemo(demo) {
  const base = [
    "Enterprise Role-based Access Control",
    "Real-time Dashboard & KPI Telemetry",
    "Responsive Mobile-first Architecture",
    "Automated PDF Invoicing & Reporting",
    "RESTful API & Webhook Dispatcher",
    "High-speed Global CDN Edge Delivery"
  ];

  if (demo.catNum === 1) {
    return [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ];
  }
  if (demo.catNum === 2) {
    return [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ];
  }
  if (demo.catNum === 3) {
    return [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ];
  }
  if (demo.catNum === 4) {
    return [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ];
  }
  if (demo.catNum === 5) {
    return [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ];
  }
  if (demo.catNum === 6) {
    return [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ];
  }
  if (demo.catNum === 7) {
    return [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ];
  }
  if (demo.catNum === 8) {
    return [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ];
  }
  if (demo.catNum === 9) {
    return [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ];
  }
  if (demo.catNum === 10) {
    return [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ];
  }
  if (demo.catNum === 11) {
    return [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ];
  }
  if (demo.catNum === 12) {
    return [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ];
  }
  return base;
}

function getTechStack(demo) {
  if (demo.platform === "Mobile App") {
    return ["React Native / Flutter", "Next.js Backend", "Supabase", "PostgreSQL", "Tailwind CSS", "WebSockets"];
  }
  if (demo.ai) {
    return ["Next.js 16", "React 19", "Python / FastAPI", "LangChain", "OpenAI / Claude API", "Supabase pgvector", "Tailwind CSS"];
  }
  if (demo.erpCrm) {
    return ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase SSR", "PostgreSQL", "Prisma / Drizzle"];
  }
  return ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Stripe / Razorpay"];
}

function getSuitableFor(demo) {
  const cat = demo.catNum;
  if (cat === 1) return "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks";
  if (cat === 2) return "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms";
  if (cat === 3) return "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments";
  if (cat === 4) return "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures";
  if (cat === 5) return "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams";
  if (cat === 6) return "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners";
  if (cat === 7) return "Service contractors, law firms, CA practices, creative studios & consulting agencies";
  if (cat === 8) return "Industrial factories, manufacturing plants, wholesale distributors & procurement desks";
  if (cat === 9) return "Enterprises seeking automated operations, AI customer service, and workflow autonomy";
  if (cat === 10) return "Creator clubs, professional associations, alumni networks & community platforms";
  if (cat === 11) return "Event organizers, digital media publications, webinar producers & charitable trusts";
  if (cat === 12) return "On-demand hyper-local startups, mobile-first businesses & field team operations";
  return "Modern forward-thinking enterprises and businesses seeking digital transformation";
}

function getModules(demo) {
  return [
    {
      name: "Public Customer Facing Portal",
      description: "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
      roles: ["customer", "guest"],
      keyFeatures: ["Mobile-first responsive design", "Instant search and discovery", "Frictionless checkout / enquiry", "Account self-service hub"]
    },
    {
      name: "Command Center Admin Console",
      description: "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
      roles: ["admin"],
      keyFeatures: ["Real-time KPI telemetry", "Comprehensive catalog and record CRUD", "Staff role permission matrix", "System audit trails & export"]
    },
    {
      name: "Operational Staff / Vendor Portal",
      description: "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
      roles: ["staff", "vendor"],
      keyFeatures: ["Task queues and fulfillment lists", "Real-time status updates", "Direct customer communication", "Performance analytics"]
    }
  ];
}

function getSampleRoles(demo) {
  return [
    {
      role: "admin",
      label: "System Administrator",
      email: `admin.${demo.id}@starxalphalabs.io`,
      passwordHint: "admin@starx123",
      permissions: ["Full Access", "Financial Reports", "User Management", "System Config"]
    },
    {
      role: "customer",
      label: "Verified Customer",
      email: `customer.${demo.id}@example.com`,
      passwordHint: "customer@pass123",
      permissions: ["Browse Catalog", "Place Orders / Enquiries", "Track Status", "Profile Settings"]
    },
    {
      role: "staff",
      label: "Operational Staff",
      email: `staff.${demo.id}@starxalphalabs.io`,
      passwordHint: "staff@starx123",
      permissions: ["Process Queue", "Update Ticket Status", "View Daily Summary"]
    }
  ];
}

const demos = RAW_DEMOS.map((d, index) => {
  const cat = CATEGORY_MAP[d.catNum];
  const slug = slugify(d.name, d.id);
  const isFeatured = [1, 2, 6, 16, 17, 32, 38, 43, 52, 57, 66, 67, 87, 92, 111, 121, 123, 134, 136, 151, 152].includes(d.id);
  const isPopular = [3, 5, 18, 21, 37, 54, 70, 76, 88, 98, 105, 116, 122, 126, 133, 138, 153, 155].includes(d.id);
  const status = isFeatured ? "Live Demo" : (d.id % 4 === 0 ? "Offline Ready" : (d.id % 3 === 0 ? "Under Development" : "Live Demo"));

  return {
    id: d.id,
    name: d.name,
    slug,
    categoryNumber: d.catNum,
    categoryName: cat.name,
    categorySlug: cat.slug,
    shortDescription: `Enterprise-ready ${d.name} engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.`,
    fullDescription: `The StarX Alpha Labs ${d.name} is a comprehensive, production-tested software solution purpose-built for ${getSuitableFor(d)}. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.`,
    suitableFor: getSuitableFor(d),
    mainFeatures: getFeaturesForDemo(d),
    modules: getModules(d),
    techStack: getTechStack(d),
    developmentType: d.devType,
    platform: d.platform,
    estimatedDevelopmentTime: d.time,
    indicativeStartingPrice: d.price,
    indicativePriceUsd: d.usd,
    availabilityStatus: status,
    isAiEnabled: d.ai,
    isEcommerce: d.ecommerce,
    isErpCrm: d.erpCrm,
    isFreeDemoAvailable: true,
    isFeatured,
    isPopular,
    viewsCount: 1200 + (d.id * 37) % 840,
    rating: 4.8 + ((d.id % 3) * 0.1),
    offlineReady: true,
    sampleRoles: getSampleRoles(d),
    screenshots: [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    videoThumbnail: "/images/demos/video-thumb.png",
    videoDuration: "3:45",
    seo: {
      title: `${d.name} Demo — StarX Alpha Labs`,
      description: `Explore live interactive demo of ${d.name}. Built by StarX Alpha Labs with ${getTechStack(d).slice(0, 3).join(", ")}. Explore features, role portals, and get instant quotation.`,
      keywords: [d.name.toLowerCase(), cat.name.toLowerCase(), "custom software demo", "starx alpha labs", "enterprise web application"]
    }
  };
});

// Output code
const fileContent = `// STARX ALPHA LABS — CENTRAL DEMO MODELS REPOSITORY
// Contains exactly 160 verified demo models across 12 main categories.
// Generated strictly according to engineering specifications.

import { DemoModel } from "@/types/demo";

export const ALL_DEMOS: DemoModel[] = ${JSON.stringify(demos, null, 2)};

export function getAllDemos(): DemoModel[] {
  return ALL_DEMOS;
}

export function getDemoBySlug(slug: string): DemoModel | undefined {
  return ALL_DEMOS.find((d) => d.slug === slug);
}

export function getDemoById(id: number): DemoModel | undefined {
  return ALL_DEMOS.find((d) => d.id === id);
}

export function getDemosByCategory(categorySlug: string): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.categorySlug === categorySlug);
}

export function getFeaturedDemos(): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.isFeatured);
}

export function getPopularDemos(): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.isPopular || d.isFeatured);
}

export function getRelatedDemos(currentDemo: DemoModel, count: number = 4): DemoModel[] {
  return ALL_DEMOS
    .filter((d) => d.categorySlug === currentDemo.categorySlug && d.id !== currentDemo.id)
    .slice(0, count);
}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/demos.ts'), fileContent, 'utf8');
console.log(`Generated ${demos.length} demos in src/data/demos.ts successfully!`);
