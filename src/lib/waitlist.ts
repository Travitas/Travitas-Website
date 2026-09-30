export type WaitlistRole = "buyer" | "seller";

export const buyerCategories = [
  "Travel Agent",
  "Tour Operator",
  "DMC",
  "MICE Agency",
  "Corporate Travel Planner",
  "Wedding Planner / Curator",
  "Event / Destination Management",
  "Group Travel Organiser",
  "Leisure Travel Specialist",
  "Luxury Travel Specialist",
  "Other Travel Buyer",
] as const;

export const sellerCategories = [
  "Hotel / Resort",
  "Airline",
  "Cruise Line",
  "Fleet / Ground Transport",
  "DMC / Destination Partner",
  "Venue",
  "Experiences & Activities",
  "Tourism & Attractions",
  "Travel Services",
  "Other Supplier",
] as const;

export type WaitlistPayload = {
  role: WaitlistRole;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  category: string;
};

export type WaitlistResult = { alreadyJoined: boolean };

/**
 * Single place to plug in a backend.
 * Currently frontend-only: it simulates a network call and resolves.
 * Replace the body with a fetch() to your endpoint (Formspree, Google Sheets
 * webhook, your own API...). Return { alreadyJoined: true } if the email is
 * already registered, or throw an Error to show the error toast.
 */
export async function submitWaitlist(_payload: WaitlistPayload): Promise<WaitlistResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { alreadyJoined: false };
}
