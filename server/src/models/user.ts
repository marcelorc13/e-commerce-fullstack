import z from "zod"

export const userSchema = z.object({
    id: z.void(),
    nome: z.string().min(2).max(60),
    sobrenome: z.string().min(3).max(120),
    email: z.string().email(),
    senha: z.string().min(6).max(30),
})

export type userType = z.infer<typeof userSchema>