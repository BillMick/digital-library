import * as z from 'zod';

export const RegisterSchema = z.object({
    surname: z.string().min(1, {
        message: "Veuillez entrer votre nom"
     }),
    firstname: z.string().min(1, { 
        message: "Veuillez entrer votre prénom"
     }),
     civility: z.enum(["Monsieur", "Madame"], {
        message: "Veuillez sélectionner une civilité",
      }),
      
    phoneNumber: z.string().optional(),
    email: z.string()
    .email({ message: "Veuillez entrer une adresse e-mail valide" })
    .regex(/^[a-zA-Z0-9._%+-]+@digital\.com$/, { message: "L'email doit se terminer par @digital.com" 
    }),
    role: z.enum(["ETUDIANT", "ENSEIGNANT", "BIBLIOTHECAIRE", "ADMINISTRATEUR"], {
        message: "Veuillez sélectionner un rôle",
      }),
      
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères"
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirmer le mot de passe"
    }),
    regNumber: z.string()
      .length(8, { message: "Le numéro d'étudiant doit contenir exactement 8 chiffres" })
      .regex(/^\d{8}$/, { message: "Le numéro d'étudiant doit être composé uniquement de 8 chiffres" })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
})
})