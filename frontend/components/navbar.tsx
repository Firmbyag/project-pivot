"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import {
  RiLockFill,
  RiLoginCircleFill,
  RiMailCheckFill,
  RiUserFill,
} from "react-icons/ri";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";
import {
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  listDuqueDeCaxiasNeighborhood,
  listGrausdeEnsino,
  listNiteroiNeighborhood,
  listNovaIguacuNeighborhood,
  listSaoGoncaloNeighborhood,
  navbarMenuCities,
} from "@/utils";
import { TbLogin2 } from "react-icons/tb";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [city, setCity] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [ensino, setEnsino] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Construir a URL de busca com os parâmetros selecionados
      const queryParams = new URLSearchParams({
        city,
        neighbourhood,
        ensino,
      });

      // Navegar para a página de resultados de busca com os parâmetros
      router.push(`/search?${queryParams.toString()}`);
      
      // Se necessário, você pode fazer uma requisição para o backend
      // const response = await fetch(`/api/search?${queryParams.toString()}`);
      // const data = await response.json();
      // Tratar os dados retornados, se necessário

    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      variant="faded"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="bg-orange-500 dark:bg-purple-800"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            Bolsa Livre
          </NextLink>
        </NavbarBrand>
        <Select
          label=""
          variant="flat"
          placeholder="Filtrar por cidade"
          selectedKeys={[city]}
          className="max-w-xs"
          startContent={<BiSearch className="text-purple-900" />}
          onChange={handleSelectionChange}
        >
          {navbarMenuCities.map((city) => (
            <SelectItem key={city.key}>{city.label}</SelectItem>
          ))}
        </Select>
        <Select
          label=""
          variant="flat"
          size="md"
          placeholder="Filtrar por bairro"
          startContent={<BiSearch className="text-purple-900" />}
          className="max-w-xs"
          onChange={(e) => setNeighbourhood(e.target.value)}
        >
          {city == "niterio"
            ? listNiteroiNeighborhood.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))
            : city == "nova iguacu"
            ? listNovaIguacuNeighborhood.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))
            : city == "duque de caxias"
            ? listDuqueDeCaxiasNeighborhood.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))
            : listSaoGoncaloNeighborhood.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))}
        </Select>
        <Select
          label=""
          variant="flat"
          placeholder="Filtrar por ensino"
          selectedKeys={[ensino]}
          labelPlacement="outside"
          startContent={<BiSearch className="text-purple-900" />}
          className="max-w-xs"
          onChange={(e) => setEnsino(e.target.value)}
        >
          {listGrausdeEnsino.map((ensino) => (
            <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
          ))}
        </Select>
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden md:flex">
            <Button
              color="secondary"
              className="text-sm font-semibold bg-white"
              startContent={<BiSearch size={20} className="text-slate-400" />}
              variant="solid"
              onPress={handleSearch} // Adiciona a ação de busca ao clicar no botão
            >
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              color="secondary"
              className="text-sm font-semibold bg-purple-950"
              startContent={<TbLogin2 size={24} className="text-white" />}
              variant="solid"
              onPress={onOpen}
            >
              Fazer Login
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>

      <Modal
        className="absolute top-10 h-fit"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex-col items-baseline">
                  <p className="text-lg text-orange-600">
                    {isRegistering ? "Cadastre-se" : "Faça Login"}
                  </p>
                  <span className="text-xs font-light">
                    {isRegistering ? "Insira suas informações para se cadastrar" : "ou crie seu cadastro"}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                {isRegistering ? (
                  <>
                    <Input
                      autoFocus
                      label="Nome Completo"
                      placeholder="Digite seu nome completo"
                      variant="bordered"
                    />
                    <Input
                      label="Email"
                      placeholder="Digite seu email"
                      variant="bordered"
                      endContent={
                        <RiMailCheckFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <Input
                      label="CPF"
                      placeholder="Digite seu CPF"
                      variant="bordered"
                    />
                    <Input
                      label="Telefone"
                      placeholder="Digite seu telefone"
                      variant="bordered"
                    />
                    <Input
                      label="Senha"
                      placeholder="*********"
                      type="password"
                      variant="bordered"
                      endContent={
                        <RiLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <Input
                      label="Confirmar Senha"
                      placeholder="*********"
                      type="password"
                      variant="bordered"
                      endContent={
                        <RiLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </>
                ) : (
                  <>
                    <Input
                      autoFocus
                      label="Email ou CPF"
                      placeholder="Digite seu email ou CPF"
                      variant="bordered"
                      endContent={
                        <RiMailCheckFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <Input
                      label="Senha"
                      placeholder="*********"
                      type="password"
                      variant="bordered"
                      endContent={
                        <RiLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Me lembrar
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Esqueceu sua senha ?
                      </Link>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {isRegistering && (
                  <Button color="secondary" onPress={toggleRegistering}>
                    Voltar
                  </Button>
                )}
                  {!isRegistering && (
                    <Button color="secondary" onPress={toggleRegistering}>
                      Cadastrar-se
                    </Button>
                  )}
                <Button
                  color="primary"
                  onPress={isRegistering ? toggleRegistering : onClose}
                >
                  {isRegistering ? "Cadastrar" : "Entrar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
