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
        senha: "",
        confirmarSenha: ""
    })

    const validarSenha = () => {
        if(cadastro.senha != cadastro.confirmarSenha) {
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

        if(!validar){
            return toast.error("A confirmação de senha está não condiz com a senha")
        }

        const result = cadastrarUserSchema.safeParse(cadastro);

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
                //return console.log({ message: "Não foi possivel cadastrar o usuário", result: res })
                return toast.error("Não foi possível cadastrar o usuário")
            }
            //console.log({ message: "Usuário cadastrado com sucesso", result: res })
            return toast.success("Usuário cadastrado com sucesso")
        }
        catch (err) {
            return console.log(err)
        }

    }

    return (
        <main className='flex flex-col w-full h-screen items-center justify-between bg-cor-primaria'>
            <section className='flex flex-col gap-1 w-full text-center py-16 bg-cor-quaternaria text-cor-primaria rounded-br-3xl'>
                <h1 className='text-3xl font-semibold'>Bem-Vindo!</h1>
                <h2 className='text-sm'>Crie sua conta agora</h2>
            </section>

            <form onSubmit={HandleSubmit} className='flex flex-col w-full gap-4 items-center px-10 text-cor-quaternaria'>
                <input onChange={HandleChange} type="text" name="nome" id="nome" placeholder='Nome' />
                <input onChange={HandleChange} type="text" name="sobrenome" id="sobrenome" placeholder='Sobrenome' />
                <input onChange={HandleChange} type="email" name="email" id="email" placeholder='E-mail' />
                <input onChange={HandleChange} type="password" name="senha" id="senha" placeholder='Senha' />
                <input onChange={HandleChange} type="password" name="confirmarSenha" id="confirmarSenha" placeholder='Confirmar Senha' />
                <button className='w-full rounded-xl py-2 bg-cor-terciaria' type='submit'>Cadastrar-se</button>
            </form>

            <div className='py-6 text-cor-quaternaria'>
                Ja possui uma conta? <Link href={"/"} >Fazer Login</Link>
            </div>
        </main>
    );
};

export default CadastroClient;