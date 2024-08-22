"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center md:py-10">
      {/* <h2 className="text-2xl text-purple-800 font-semibold text-left">Filtrar por tipo de Ensino:</h2> */}
      <div className="flex flex-col items-center font-bold justify-center gap-2">
        <Image src="https://bolsalivre.com/front/img/logo_novo_bolsalivre.png" width={300} />
        <h2 className="text-5xl text-purple-950 flex flex-col">
          Tenha acesso as melhores <br />{" "}
          <b className="text-orange-600">Bolsas Escolas</b>
        </h2>
        {/* <div className="w-full font-normal flex flex-col">
          <span className="text-base">
            Nós da Bolsa Livre listamos as melhores bolsas escolares para seu
            filho
          </span>
          <span className=" font-semibold text-purple-600">
            independente da idade, e ensino.
          </span>
        </div> */}
      </div>
      <div className="flex flex-col gap-6 my-8">
        <div className="flex-col items-baseline w-full">
          <p className="text-2xl text-purple-950 font-bold">
            Buscar bolsas por ensino:
          </p>
          <span className="text-xs font-light">
            selecione o tipo de bolsa quer você a depender do tipo de ensino
          </span>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-4">
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none hover:scale-95 delay-75 transition-all"
          >
            <CardHeader className="pb-0 py-3 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Tipo de Ensino</p>
              <small className="text-default-500">Básico</small>
            </CardHeader>
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={350}
              src="https://images.pexels.com/photos/17771091/pexels-photo-17771091/free-photo-of-mesa-balcao-computador-portatil-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={350}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Saiba mais.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Clique Aqui
              </Button>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none hover:scale-95 delay-75 transition-all"
          >
            <CardHeader className="pb-0 py-3 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Tipo de Ensino </p>
              <small className="text-default-500">Fundamental</small>
            </CardHeader>
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={350}
              src="https://images.pexels.com/photos/6209060/pexels-photo-6209060.jpeg?auto=compress&cs=tinysrgb&w=600"
              width={350}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Saiba mais.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Clique Aqui
              </Button>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none hover:scale-95 delay-75 transition-all"
          >
            <CardHeader className="pb-0 py-3 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Tipo de Ensino</p>
              <small className="text-default-500">Faculdade</small>
            </CardHeader>
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={350}
              src="https://images.pexels.com/photos/6584748/pexels-photo-6584748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={350}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Saiba mais.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Clique Aqui
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex-col items-baseline">
            <p className="text-2xl text-purple-950 font-bold">
              Colégio particulares:
            </p>
            <span className="text-xs font-light">
              de uma olhada em alguns dos colégios que temos disponíveis na
              nossa lista
            </span>
          </div>
          <div className="w-full relative">
            <Image
              className="relative"
              // height={300}
              // width={800}
              src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <div className="p-4 absolute top-0 left-0 w-full z-20 backdrop-blur-md bg-white/30">
              <p className="text-lg text-white">Nome do Colégio</p>
              <span className="text-gray-200 font-light text-xs">Endereço</span>
            </div>
            <Button
              isIconOnly
              radius="full"
              className="absolute left-3 top-1/2 z-20"
            >
              <RiArrowGoBackFill />
            </Button>
            <Button
              isIconOnly
              radius="full"
              className="absolute right-3 top-1/2  z-20"
            >
              <RiArrowGoForwardFill />
            </Button>
          </div>
          <div className="flex-col items-baseline">
            <h3 className="text-2xl text-purple-950 font-bold">
              Transformando vidas e histórias
            </h3>
            <span className="text-xs font-light">
              veja alguns relatos de pais e mães que são adeptos da bolsa livre
            </span>
            <div className="flex flex-row items-center mt-4 gap-4 flex-wrap">
              <Card className="max-w-[320px] border border-orange-200">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://images.pexels.com/photos/1096141/pexels-photo-1096141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold">Camilla</p>
                    <p className="text-xs font-light text-default-500">
                      mãe de aluno
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    “Eu queria tirar minha filha da rede pública porque a
                    educação é péssima, mas não consegui pagar todo o custo de
                    uma escola particular, consegui 30% em uma escola perto da
                    minha casa”
                  </p>
                </CardBody>
                <Divider />
              </Card>
              <Card className="max-w-[320px] border border-orange-200">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://images.pexels.com/photos/35024/laughter-laugh-fun-mom.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold">Camilla</p>
                    <p className="text-xs font-light text-default-500">
                      mãe de aluno
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    “Eu queria tirar minha filha da rede pública porque a
                    educação é péssima, mas não consegui pagar todo o custo de
                    uma escola particular, consegui 30% em uma escola perto da
                    minha casa”
                  </p>
                </CardBody>
                <Divider />
              </Card>
              <Card className="max-w-[320px] border border-orange-200">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://images.pexels.com/photos/2274162/pexels-photo-2274162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold">Camilla</p>
                    <p className="text-xs font-light text-default-500">
                      mãe de aluno
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    “Eu queria tirar minha filha da rede pública porque a
                    educação é péssima, mas não consegui pagar todo o custo de
                    uma escola particular, consegui 30% em uma escola perto da
                    minha casa”
                  </p>
                </CardBody>
                <Divider />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
