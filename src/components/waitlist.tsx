import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Building2, CircleCheck, LoaderCircle, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  buyerCategories,
  sellerCategories,
  submitWaitlist,
  type WaitlistResult,
  type WaitlistRole,
} from "@/lib/waitlist";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  company: z.string().trim().min(2, "Please enter your company name").max(160),
  email: z.string().trim().email("Please enter a valid work email"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{6,20}$/, "Please enter a valid phone number"),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  category: z.string().min(1, "Please choose a category"),
});
type FormValues = z.infer<typeof schema>;

const emptyValues: FormValues = { name: "", company: "", email: "", phone: "", city: "", category: "" };

const roles = [
  { role: "buyer", label: "I'm a Buyer", hint: "Source verified suppliers", icon: Search },
  { role: "seller", label: "I'm a Seller", hint: "Reach professional buyers", icon: Building2 },
] as const;

type WaitlistContextValue = { openWaitlist: (role: WaitlistRole) => void };
const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside WaitlistProvider");
  return ctx;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<WaitlistRole>("buyer");
  const [result, setResult] = useState<WaitlistResult | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: emptyValues });

  const value = useMemo<WaitlistContextValue>(
    () => ({
      openWaitlist: (next) => {
        setRole(next);
        setResult(null);
        setOpen(true);
      },
    }),
    [],
  );

  const pickRole = (next: WaitlistRole) => {
    setRole(next);
    form.setValue("category", "");
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await submitWaitlist({ ...values, role });
      setResult(res);
      form.reset(emptyValues);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const categories = role === "buyer" ? buyerCategories : sellerCategories;

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-white/10 bg-card sm:max-w-lg">
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CircleCheck className="size-8" />
              </div>
              <DialogTitle className="text-3xl font-semibold">
                {result.alreadyJoined ? "You're already in." : "Welcome aboard."}
              </DialogTitle>
              <DialogDescription className="max-w-sm text-base">
                {result.alreadyJoined
                  ? "This email is already on the Travitas waitlist. We'll be in touch at launch."
                  : `You're on the founding ${role} waitlist. We'll reach out with early access before we open the network wider.`}
              </DialogDescription>
              <Button className="mt-2 cursor-pointer" onClick={() => setOpen(false)}>
                Back to Travitas
              </Button>
            </motion.div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">Join the founding network</DialogTitle>
                <DialogDescription>Founding members get first access.</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3">
                {roles.map(({ role: key, label, hint, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => pickRole(key)}
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors",
                      role === key
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/40 hover:border-white/25",
                    )}
                  >
                    <Icon
                      className={cn("size-5", role === key ? "text-primary" : "text-muted-foreground")}
                    />
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs text-muted-foreground">{hint}</span>
                  </button>
                ))}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
                  <TextField form={form} name="name" label="Full name" placeholder="Priya Sharma" />
                  <TextField form={form} name="company" label="Company" placeholder="Horizon Holidays" />
                  <TextField form={form} name="email" label="Work email" placeholder="priya@horizon.in" type="email" />
                  <TextField form={form} name="phone" label="Phone / WhatsApp" placeholder="+91 98765 43210" type="tel" />
                  <TextField form={form} name="city" label="City" placeholder="New Delhi" />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{role === "buyer" ? "You are a" : "You offer"}</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue placeholder="Choose one" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c} value={c} className="cursor-pointer">
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="mt-2 h-12 cursor-pointer text-base font-semibold sm:col-span-2"
                  >
                    {form.formState.isSubmitting && <LoaderCircle className="size-4 animate-spin" />}
                    Join as a {role === "buyer" ? "Buyer" : "Seller"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground sm:col-span-2">
                    {role === "buyer"
                      ? "Buyers join free. No subscription, listing fee or commission."
                      : "Founding seller memberships will be limited."}
                  </p>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

function TextField({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: {
  form: ReturnType<typeof useForm<FormValues>>;
  name: Exclude<keyof FormValues, "category">;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
