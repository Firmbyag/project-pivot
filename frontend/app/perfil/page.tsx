"use client";

import { decodeToken } from "@/utils/token";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import React, { use, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const PerfilPage = () => {
  const [user, setUser] = useState("");
  console.log(user)
  const router = useRouter();
  const userInfo = decodeToken();

  useEffect(() => {
    fetch(`http://localhost:4000/usuarios/${userInfo.email}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center justify-between mb-2">
        <div className="flex flex-col">
          <h2 className="text-2xl text-secondary font-bold">Meu Perfil</h2>
          <span className="text-xs">veja os dados do seu perfil</span>
        </div>
        <Button
          className="text-white"
          color="secondary"
          endContent={<BiArrowBack className="text-white text-lg" />}
          onPress={() => router.push("/")}
        >
          Voltar
        </Button>
      </div>
      <Divider />
      <div className="flex flex-row items-center gap-16 my-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-baseline">
            <p className="text-xs">Nome</p>
            <label className="font-semibold" htmlFor="">
              {user[0]?.nome}
            </label>
          </div>
          <div className="flex flex-col items-baseline">
            <p className="text-xs">Email</p>
            <label className="font-semibold" htmlFor="">
              {user[0]?.email}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-baseline">
            <p className="text-xs">CPF</p>
            <label className="font-semibold" htmlFor="">
              {user[0]?.cpf}
            </label>
          </div>
          <div className="flex flex-col items-baseline">
            <p className="text-xs">Telefone</p>
            <label className="font-semibold" htmlFor="">
              {user.telefone}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
