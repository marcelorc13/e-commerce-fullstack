'use client'

import './cadastro.css'
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { cadastrarUserSchema, cadastrarUserType } from '@/schemas/userSchemas';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CadastroClient: React.FC = ({ }) => {

    const router = useRouter()

    const [cadastro, setCadastro] = useState<cadastrarUserType>({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    })

    const validarSenha = () => {
        if (cadastro.senha != cadastro.confirmarSenha) {
            return false
        }
        return true
    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCadastro((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validar = validarSenha()

        if (!validar) {
            return toast.error("A confirmação de senha está não condiz com a senha")
        }

        const result = cadastrarUserSchema.safeParse(cadastro);

        if (!result.success) {
            result.error.issues.forEach((err) => {
                return toast.error(err.message)
            })
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
                method: "POST",
                body: JSON.stringify(cadastro),
                headers: {
                    'content-type': 'application/json'
                }
            })

            const result = await res.json()

            if (!res.ok) {
                return toast.error(result.message)
            }

            toast.success(result.message)
            return router.push("/login")
        }
        catch (err) {
            return console.log(err)
        }

    }

    return (
        <main className='flex flex-col md:flex-row w-full h-screen items-center justify-between bg-cor-primaria md:ps-2 md:py-2 '>
            <section className='flex flex-col gap-1 w-full md:hidden text-center py-20 bg-cor-quaternaria text-cor-primaria rounded-br-3xl'>
                <h1 className='text-3xl font-semibold'>Seja Bem-vindo!</h1>
                <h2 className='text-sm'>Crie sua conta agora</h2>
            </section>

            <section
                style={{ backgroundImage: "url('/background-cadastro.png'" }}
                className='relative hidden md:flex flex-col md:basis-1/2 lg:basis-4/5 gap-1 w-full h-full justify-center text-center bg-center text-cor-quaternaria rounded-tr-3xl'>
                <h2 className='text-2xl font-poppins px-8 leading-relaxed'>"Nosso estilo reflete quem somos e como escolhemos enfrentar o mundo. Aqui, cada peça conta uma história, cada detalhe é pensado para que você sinta a confiança de ser quem realmente é. Descubra uma nova forma de se expressar através da moda."</h2>
                <span className='absolute bottom-8 left-8 text-lg'>Clothes AI</span>

            </section>

            <section className='md:flex md:flex-col w-full gap-4 items-center md:basis-1/2 text-cor-quaternaria'>
                <div className=' hidden md:flex flex-col gap-2 items-center'>
                    <h1 className='text-3xl font-medium'>Seja Bem-vindo!</h1>
                    <h1 className='text-lg'>Crie sua conta agora</h1>
                </div>
                <form onSubmit={HandleSubmit} className='flex flex-col w-full gap-4 md:gap-6 items-center px-10'>
                    <input onChange={HandleChange} type="text" name="nome" id="nome" placeholder='Nome' />
                    <input onChange={HandleChange} type="text" name="sobrenome" id="sobrenome" placeholder='Sobrenome' />
                    <input onChange={HandleChange} type="email" name="email" id="email" placeholder='E-mail' />
                    <input onChange={HandleChange} type="password" name="senha" id="senha" placeholder='Senha' />
                    <input onChange={HandleChange} type="password" name="confirmarSenha" id="confirmarSenha" placeholder='Confirmar Senha' />
                    <button className='w-full rounded-xl py-2 bg-cor-terciaria' type='submit'>Cadastrar-se</button>
                </form>
                <div className='text-cor-quaternaria hidden md:flex gap-2'>
                    <span>Ja possui uma conta?</span> <Link href={"/login"} >Fazer Login</Link>
                </div>
            </section>

            <div className='py-16 text-cor-quaternaria md:hidden'>
                <span>Ja possui uma conta?</span> <Link href={"/login"} >Fazer Login</Link>
            </div>
        </main>
    );
};

export default CadastroClient;