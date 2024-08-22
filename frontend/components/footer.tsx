import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
// import { Snippet } from "next/font/google";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-orange-500 dark:bg-purple-800 w-full flex items-center flex-wrap justify-around py-6">
      <div className=" text-white flex flex-col items-baseline">
        <h3 className="font-semibold">Parceiros</h3>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Quero ser parceiro</span>
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Blog Gestores</span>
        </Link>
        <Link
        //   isExternal
          className="flex items-center gap-1 text-current"
          href="/gestor"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Área do Gestor</span>
        </Link>
      </div>
      <div className="text-white flex flex-col items-baseline">
        <h3 className="font-semibold">Encontre bolsas</h3>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Instituições de Ensino</span>
        </Link>
      </div>
      <div className="text-white flex flex-col items-baseline">
        <h3 className="font-semibold">Institucional</h3>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Sobre o Bolsa Livre</span>
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Educação é para todos</span>
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Trabalhe Conosco</span>
        </Link>
      </div>
      <div className="text-white flex flex-col items-baseline">
        <h3 className="font-semibold">Outras bolsas</h3>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Faculdade com Bolsa</span>
        </Link>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-100 text-sm my-1 font-light">Cursos Técnicos com Bolsa</span>
        </Link>
      </div>
      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="shadow" className="bg-orange-800">
          <span>
            desenvolvido por  <Code color="primary">Firmby</Code>
          </span>
        </Snippet>
      </div> */}
    </div>
  );
};

export default Footer;
