'use client'

import { loginUserSchema, loginUserType } from "@/schemas/userSchemas";
import "./login.css"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from 'react';
import toast from "react-hot-toast";

interface Props {

}

const LoginClient: React.FC<Props> = ({ }) => {

    const router = useRouter()

    const [login, setLogin] = useState<loginUserType>({
        email: '',
        senha: ''
    })

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogin((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validar = loginUserSchema.safeParse(login)
        if (validar.success == false) {
            return toast.error("Usuário ou senha incorreto")
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: "POST",
            body: JSON.stringify(login),
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })
        const result = await res.json()
        if (!res.ok) {
            return toast.error(result.message)
        }
        toast.success(result.message)
        console.log(result)
        return router.push("/")
    }

    return (
        <main className='flex flex-col md:flex-row w-full h-screen items-center justify-between bg-cor-primaria md:pe-2 md:py-2 '>
            <section className='flex flex-col gap-1 w-full md:hidden text-center py-20 bg-cor-quaternaria text-cor-primaria rounded-bl-3xl'>
                <h1 className='text-3xl font-semibold'>Bem-vindo novamente!</h1>
                <h2 className='text-sm'>Entre na sua conta agora</h2>
            </section>

            <section className='md:flex md:flex-col w-full gap-4 items-center md:basis-1/2 text-cor-quaternaria'>
                <div className=' hidden md:flex flex-col gap-2 items-center'>
                    <h1 className='text-2xl font-medium'>Bem-vindo novamente!</h1>
                    <h1 className='text-md'>Entre na sua conta agora</h1>
                </div>
                <form onSubmit={HandleSubmit} className='flex flex-col w-full gap-4 md:gap-6 items-center px-10'>
                    <input onChange={HandleChange} type="email" name="email" id="email" placeholder='E-mail' />
                    <input onChange={HandleChange} type="password" name="senha" id="senha" placeholder='Senha' />
                    <button className='w-full rounded-xl py-2 bg-cor-terciaria' type='submit'>Entrar</button>
                </form>
                <div className='text-cor-quaternaria hidden md:flex gap-2'>
                    <span>Ainda não possui uma conta?</span> <Link href={"/cadastro"} >Cadastre-se</Link>
                </div>
            </section>

            <section
                style={{ backgroundImage: "url('/background-login.png'" }}
                className='relative hidden md:flex flex-col md:basis-1/2 lg:basis-4/5 gap-1 w-full h-full justify-center text-center bg-center text-cor-quaternaria rounded-bl-3xl'>
                <h2 className='text-2xl font-poppins px-8 leading-relaxed'>"Nossas escolhas revelam muito mais do que imaginamos. Em cada detalhe, construímos uma narrativa que vai além da aparência, expressando nossa essência e conectando-nos com o que realmente importa. Aqui, acreditamos que a verdadeira elegância está na autenticidade de quem somos."</h2>
                <span className='absolute bottom-8 right-8 text-lg'>Clothes AI</span>
            </section>
            <div className='py-16 text-cor-quaternaria md:hidden'>
                <span>Ainda não possui uma conta?</span> <Link href={"/cadastro"} >Cadastre-se</Link>
            </div>
        </main>
    );
};

export default LoginClient;