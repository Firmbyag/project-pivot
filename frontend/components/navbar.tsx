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

export const Navbar = () => {
  const [city, setCity] = useState("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };
  const [neighbourhood, setNeighbourhood] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          startContent={<BiSearch className="text-purple-900"/>}
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
          startContent={<BiSearch className="text-purple-900"/>}
          className="max-w-xs"
        >
          {city == "niterio "
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
          selectedKeys={[city]}
          labelPlacement="outside"
          startContent={<BiSearch className="text-purple-900"/>}
          className="max-w-xs"
          onChange={handleSelectionChange}
        >
          {listGrausdeEnsino.map((ensino) => (
            <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
          ))}
        </Select>
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            {/* <ThemeSwitch /> */}
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              color="secondary"
              className="text-sm font-semibold bg-purple-950"
              startContent={
                <TbLogin2 size={24} className="text-white" />
              }
              variant="solid"
              onPress={onOpen}
            >
              Fazer Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-orange-500 light:bg-purple-900 text-white"
                  isIconOnly
                  // color="secondary"
                  radius="full"
                  variant="solid"
                >
                  <RiUserFill />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Meu Perfil</DropdownItem>
                {/* <DropdownItem key="copy">Copy link</DropdownItem> */}
                {/* <DropdownItem key="edit">Edit file</DropdownItem> */}
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
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
        // size="xs"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex-col items-baseline">
                  <p className="text-lg text-orange-600">Faça Login</p>
                  <span className="text-xs font-light">
                    ou crie seu cadastro
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <RiMailCheckFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="digite seu email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <RiLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="*********"
                  type="password"
                  variant="bordered"
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Entrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
