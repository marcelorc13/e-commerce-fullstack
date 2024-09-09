import z from "zod"

export const cadastrarUserSchema = z.object({
    nome: z.string().min(2, "O nome deve conter pelo menos 2 caracteres").max(60, "O nome deve conter no máximo 60 caracteres"),
    sobrenome: z.string().min(3, "O sobrenome deve conter pelo menos 3 caracteres").max(120, "O sobrenome deve conter no máximo 120 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").max(30, "A senha deve conter no máximo 30 caracteres"),
    confirmarSenha: z.string().nullable()
})
export const loginUserSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").max(30, "A senha deve conter no máximo 30 caracteres"),
})

export type cadastrarUserType = z.infer<typeof cadastrarUserSchema>
export type loginUserType = z.infer<typeof loginUserSchema>