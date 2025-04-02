"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      surname: '',
      firstname: '',
      civility: 'Madame',
      regNumber: '',
      phoneNumber: '',
      role: 'ETUDIANT',
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surname: data.surname,
          firstname: data.firstname,
          email: data.email,
          civility: data.civility,
          regNumber: data.regNumber,
          phoneNumber: data.phoneNumber,
          role: data.role,
          password: data.password,
        }),
      });
  
      const result = await res.json();
      console.log(result);
  
      // TODO: redirection ou message de succès
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Créer un compte"
      title="S'inscrire"
      backButtonHref="/auth/login"
      backButtonLabel="Vous avez déjà un compte ? Connectez-vous ici."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
  <div className="flex flex-wrap gap-4">
  <FormField
    control={form.control}
    name="surname"
    render={({ field }) => (
      <FormItem className="flex-1">
        <FormLabel>Nom</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Doe" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="firstname"
    render={({ field }) => (
      <FormItem className="flex-1">
        <FormLabel>Prénom</FormLabel>
        <FormControl>
          <Input {...field} placeholder="John" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
<FormField
  control={form.control}
  name="civility"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Civilité</FormLabel>
      <FormControl>
        <select {...field} className="w-full px-3 py-2 border rounded-md">
        <option value="">Sélectionnez une civilité</option>
          <option value="Monsieur">Monsieur</option>
          <option value="Madame">Madame</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

</div>
<div className="flex flex-wrap gap-4">
            <FormField
              control={form.control}
              name="regNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Numéro</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>N° Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="0723456789"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Rôle</FormLabel>
                  <FormControl>
                  <select {...field} className="w-full px-3 py-2 border rounded-md">
                    <option value="">Sélectionnez un rôle</option>
                    <option value="ETUDIANT">Etudiant</option>
                    <option value="ENSEIGNANT">Enseignant</option>
                    <option value="BIBLIOTHECAIRE">Bibliothécaire</option>
                    <option value="ADMINISTRATEUR">Administrateur</option>
                  </select>

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
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "S'inscrire"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm; 