"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  seasonalNotifyFormSchema,
  type SeasonalNotifyFormValues,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  festivalSlug: SeasonalNotifyFormValues["festivalSlug"];
  festivalLabel: string;
  heading: string;
  body: string;
  mailConfigured: boolean;
};

export function SeasonalNotifyForm({
  festivalSlug,
  festivalLabel,
  heading,
  body,
  mailConfigured,
}: Props) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SeasonalNotifyFormValues>({
    resolver: zodResolver(seasonalNotifyFormSchema),
    defaultValues: {
      email: "",
      name: "",
      festivalSlug,
      festivalLabel,
      website: "",
    },
  });

  async function onSubmit(values: SeasonalNotifyFormValues) {
    setError(null);
    const res = await fetch("/api/seasonal-notify", {
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
        <AlertTitle className="text-brand">You are on the list</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          We will email you when ordering opens for {festivalLabel}.
        </AlertDescription>
      </Alert>
    );
  }

  if (!mailConfigured) {
    return (
      <Alert>
        <AlertTitle>Notifications unavailable</AlertTitle>
        <AlertDescription>
          Email alerts are not configured yet. Contact us by email or on the
          contact page to ask about this festival.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl">{heading}</CardTitle>
        <p className="text-sm text-muted-foreground">{body}</p>
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (optional)</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="Your name" {...field} />
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
              {form.formState.isSubmitting ? "Sending..." : "Notify me"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
