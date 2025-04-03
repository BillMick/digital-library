"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || "Erreur de connexion.");
      } else {
        setSuccessMessage(result.message || "Connexion réussie.");

      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper
      label="Connectez-vous à votre compte"
      title="Connexion"
      backButtonHref="/auth/register"
      backButtonLabel="Vous n'avez pas de compte ? Inscrivez-vous ici."
    >
      {errorMessage && (
        <p className="text-red-500 bg-red-100 p-2 rounded text-sm">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-600 bg-green-100 p-2 rounded text-sm">{successMessage}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending || loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
