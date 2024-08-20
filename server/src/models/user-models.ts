import z from "zod"

export const createUserSchema = z.object({
    nome: z.string().min(2).max(60),
    sobrenome: z.string().min(3).max(120),
    email: z.string().email(),
    senha: z.string().min(6).max(30),
})

export type createUserType = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
    nome: z.string().min(2).max(60),
    sobrenome: z.string().min(3).max(120),
    email: z.string().email(),
})

export type updateUserType = z.infer<typeof updateUserSchema>