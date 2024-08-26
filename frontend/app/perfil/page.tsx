"use client";

import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const PerfilPage = () => {
  const router = useRouter();

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
            <label className="font-semibold" htmlFor="">valor name</label>
          </div>
          <div className="flex flex-col items-baseline">
            <p className="text-xs">Email</p>
            <label className="font-semibold" htmlFor="">valor email</label>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-baseline">
            <p className="text-xs">CPF</p>
            <label className="font-semibold" htmlFor="">valor cpf</label>
          </div>
          <div className="flex flex-col items-baseline">
            <p className="text-xs">Telefone</p>
            <label className="font-semibold" htmlFor="">valor Telefone</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
