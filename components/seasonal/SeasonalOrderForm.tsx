"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  seasonalOrderFormSchema,
  type SeasonalOrderFormValues,
} from "@/lib/seasonalFormSchemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  festivalSlug: SeasonalOrderFormValues["festivalSlug"];
  festivalLabel: string;
  mailConfigured: boolean;
};

export function SeasonalOrderForm({
  festivalSlug,
  festivalLabel,
  mailConfigured,
}: Props) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SeasonalOrderFormValues>({
    resolver: zodResolver(seasonalOrderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      festivalSlug,
      festivalLabel,
      deliveryOrPickup: "either",
      preferredDate: "",
      headcount: "",
      itemsNotes: "",
      website: "",
    },
  });

  async function onSubmit(values: SeasonalOrderFormValues) {
    setError(null);
    const res = await fetch("/api/seasonal-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <Alert className="border-brand/30 bg-brand/5">
        <AlertTitle className="text-brand">Order request sent</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          We received your details for {festivalLabel}. The kitchen will
          confirm by email. If you need an immediate answer, contact us.
        </AlertDescription>
        <Button className="mt-4 bg-brand hover:bg-brand-hover" asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </Alert>
    );
  }

  if (!mailConfigured) {
    return (
      <Alert>
        <AlertTitle>Order by email</AlertTitle>
        <AlertDescription className="space-y-3">
          <p>
            Web orders by email are not configured yet. Contact us to order{" "}
            {festivalLabel}.
          </p>
          <Button className="bg-brand hover:bg-brand-hover" asChild>
            <Link href="/contact">Contact us to order</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl">
          Place an order: {festivalLabel}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Send your request to the kitchen. We reply with confirmation, pricing,
          and payment steps.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
              {...form.register("website")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" autoComplete="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryOrPickup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery or pickup</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose one" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="pickup">Pickup (Al Quoz)</SelectItem>
                      <SelectItem value="either">Either / not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 14 Sep, evening" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headcount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headcount</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 12 adults" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="itemsNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What you would like</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Sadhya boxes, cake loaves, trays, dietary notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="bg-brand hover:bg-brand-hover"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Send order request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
