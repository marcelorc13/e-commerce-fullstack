'use client'

import './cadastro.css'
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { cadastrarUserSchema, cadastrarUserType } from '@/schemas/userSchemas';
import toast from 'react-hot-toast';

const CadastroClient: React.FC = ({ }) => {

    const [cadastro, setCadastro] = useState<cadastrarUserType>({
        nome: "",
        sobrenome: "",
        email: "",
        senha: ""
    })

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCadastro((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = cadastrarUserSchema.safeParse(cadastro)

        if (!result.success) {
            result.error.issues.forEach((err) => {
                return toast.error(err.message)
            })
        }
        try {
            const res = await fetch("http://localhost:8080/api/users/", {
                method: "POST",
                body: JSON.stringify(cadastro),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (!res.ok) {
                return console.log({ message: "Não foi possivel cadastrar o usuário", result: res })
            }
            console.log({ message: "Usuário cadastrado com sucesso", result: res })
            return toast.success("Usuário cadastrado com sucesso")
        }
        catch (err) {
            return console.log(err)
        }

    }

    return (
        <main className='flex flex-col w-full h-screen justify-center items-center gap-10'>
            <section className='flex flex-col text-center'>
                <h1 className='text-2xl font-semibold'>Bem-Vindo!</h1>
                <h2 className='text-sm'>Crie sua conta agora</h2>
            </section>
            <form onSubmit={HandleSubmit} className='flex flex-col w-full gap-4 items-center px-10'>
                <input onChange={HandleChange} type="text" name="nome" id="nome" placeholder='Nome' />
                <input onChange={HandleChange} type="text" name="sobrenome" id="sobrenome" placeholder='Sobrenome' />
                <input onChange={HandleChange} type="email" name="email" id="email" placeholder='E-mail' />
                <input onChange={HandleChange} type="password" name="senha" id="senha" placeholder='Senha' />
                <button type='submit'>Cadastrar-se</button>
            </form>

            <div>
                Ja possui uma conta? <Link href={"/"} >Fazer Login</Link>
            </div>
        </main>
    );
};

export default CadastroClient;