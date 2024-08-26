import z from "zod"

export const createUserSchema = z.object({
    nome: z.string().min(2).max(60),
    sobrenome: z.string().min(3).max(120),
    email: z.string().email(),
    senha: z.string().min(6).max(30),
})

export const updateUserSchema = z.object({
    nome: z.string().min(2).max(60),
    sobrenome: z.string().min(3).max(120),
    email: z.string().email(),
})

export const userResponseSchema = z.object({
    id: z.number(),
    nome: z.string(),
    sobrenome: z.string(),
    email: z.string().email()
})

export type createUserDTO = z.infer<typeof createUserSchema>
export type updateUserDTO = z.infer<typeof updateUserSchema>
export type userResponseDTO = z.infer<typeof updateUserSchema>