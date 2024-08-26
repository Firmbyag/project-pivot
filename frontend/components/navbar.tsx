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
  Avatar,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { BiLogIn, BiSearch } from "react-icons/bi";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  removeFromLocalStorage,
  saveInLocalStorage,
} from "@/utils/localstorage";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";
import { decodeToken } from "@/utils/token";

export const Navbar = () => {
  const [city, setCity] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [ensino, setEnsino] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const tokenUserLogged = decodeToken();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({});

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

  const doLogin = async () => {
    setLoading(true);

    const { email, senha } = getValues();
    try {
      const response = await fetch(`http://localhost:4000/usuarios/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();

      saveInLocalStorage("bolsalivre_token", data.token);
      onClose();
      router.push("/bolsas");
      toast.success("Login efetuado com sucesso");
    } catch (error) {
      toast.error("Erro ao fazer login");
    }
    setLoading(false);
  };

  const registerUser = async () => {
    const {nome, email, senha, cpf, telefone} = getValues();

    try {
      const response = await fetch('http://localhost:4000/usuarios/cadastro', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          nome,
          email,
          senha,
          cpf,
          telefone: telefone ?? ''
        }),
      })
      const data = await response.json()
      toast.success('Usuário cadastrado com sucesso, faça Login!')
    } catch (error) {
      toast.error('Erro ao cadastrar usuário')
    }
  };

  const onLogout = () => {
    removeFromLocalStorage("bolsalivre_token");
    router.push("/bolsas");
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
            ></Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            {tokenUserLogged !== undefined ? (
              <Popover showArrow placement="bottom">
                <PopoverTrigger>
                  <Avatar
                    className="uppercase bg-slate-200"
                    // color="secondary"
                    isBordered
                    name={tokenUserLogged?.nome}
                  />
                </PopoverTrigger>
                <PopoverContent className="p-1">
                  <Listbox aria-label="Actions">
                    <ListboxItem
                      key="profile"
                      onPress={() => router.push("/perfil")}
                    >
                      Meu Perfil
                    </ListboxItem>
                    {/* <ListboxItem key="password">Alterar Senha</ListboxItem> */}
                    <ListboxItem color="danger" key="logout" onPress={onLogout}>
                      Sair
                    </ListboxItem>
                  </Listbox>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                color="secondary"
                className="text-sm font-semibold text-white"
                startContent={<TbLogin2 size={24} className="text-white" />}
                variant="solid"
                onPress={onOpen}
              >
                Fazer Login
              </Button>
            )}
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
                  <p className="text-lg font-semibold text-primary">
                    {isRegistering ? "Cadastre-se" : "Faça Login"}
                  </p>
                  <span className="text-xs font-light">
                    {isRegistering
                      ? "Insira suas informações para se cadastrar"
                      : "ou crie seu cadastro"}
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
                      isInvalid={watch("nome") === ""}
                      errorMessage="Nome é obrigatório"
                      {...register("nome")}
                    />
                    <Input
                      label="Email"
                      placeholder="Digite seu email"
                      variant="bordered"
                      isInvalid={watch("email") === ""}
                      errorMessage="email é obrigatório"
                      endContent={
                        <RiMailCheckFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      {...register("email", { required: true, maxLength: 10 })}
                    />
                    <Input
                      label="CPF"
                      placeholder="Digite seu CPF"
                      variant="bordered"
                      isInvalid={watch("cpf") === ""}
                      errorMessage="CPF é obrigatório"
                      {...register("cpf", { required: true })}
                    />
                    <Input
                      label="Telefone"
                      placeholder="Digite seu telefone"
                      variant="bordered"
                      {...register("telefone")}
                    />
                    <Input
                      label="Senha"
                      placeholder="*********"
                      type="password"
                      variant="bordered"
                      // isInvalid={watch("senha") === ""}
                      // errorMessage="senha é obrigatório"
                      endContent={
                        <RiLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      {...register("senha")}
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
                      label="Email"
                      placeholder="Digite seu email ou CPF"
                      variant="bordered"
                      isInvalid={watch("email") === ""}
                      errorMessage="email é obrigatório"
                      endContent={
                        <RiMailCheckFill className="text-2xl text-primary pointer-events-none flex-shrink-0" />
                      }
                      {...register("email")}
                    />
                    <Input
                      label="Senha"
                      placeholder="*********"
                      type="password"
                      variant="bordered"
                      isInvalid={watch("senha") === ""}
                      errorMessage="senha é obrigatório"
                      endContent={
                        <RiLockFill className="text-2xl text-primary pointer-events-none flex-shrink-0" />
                      }
                      {...register("senha")}
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
                  <Button className="text-white" color="secondary" onPress={toggleRegistering}>
                    Voltar
                  </Button>
                )}
                {!isRegistering && (
                  <Button
                    color="secondary"
                    className="text-white"
                    onPress={toggleRegistering}
                  >
                    Cadastrar-se
                  </Button>
                )}
                <Button
                  color="primary"
                  className="text-white"
                  onPress={isRegistering ? registerUser : doLogin}
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
