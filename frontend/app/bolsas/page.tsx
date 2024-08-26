"use client";
import { SearchIcon } from "@/components/icons";
import SchoolCard from "@/components/schoolCard";
import {
  filtroporValor,
  listDuqueDeCaxiasNeighborhood,
  listGrausdeEnsino,
  listNiteroiNeighborhood,
  listNovaIguacuNeighborhood,
  listSaoGoncaloNeighborhood,
  navbarMenuCities,
} from "@/utils";
import {
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";

const BolsasPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [city, setCity] = useState("");
  const [ensino, setEnsino] = useState("");
  const [bairro, setBairro] = useState("");
  const [valor, setValor] = useState("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;
    
    if (type === "city") setCity(value);
    if (type === "ensino") setEnsino(value);
    if (type === "bairro") setBairro(value);
    if (type === "valor") setValor(value);

  };

  const handleSearch = () => {
    const filtros = {
      city,
      ensino,
      bairro,
      valor,
    };

    localStorage.setItem("bolsasFiltros", JSON.stringify(filtros));

    fetch('/api/bolsas', { method: 'POST', body: JSON.stringify(filtros) })
    .then(response => response.json())
    .then(data => console.log(data));

    
    console.log("Filtros Salvos:", filtros);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col items-baseline">
        <p className="text-lg font-semibold text-purple-800">
          Bolsas cadastrar em nossa plataforma
        </p>
        <span className="text-xs font-light">
          aplique os filtros para ver as bolsas cadastradas em nossas
          plataformas
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Select
          aria-label="Filtrar por cidade"
          variant="flat"
          placeholder="Filtrar por cidade"
          selectedKeys={[city]}
          labelPlacement="outside"
          className="max-w-xs"
          onChange={(e) => handleSelectionChange(e, "city")}
        >
          {navbarMenuCities.map((city) => (
            <SelectItem key={city.key}>{city.label}</SelectItem>
          ))}
        </Select>
        <Select
          aria-label="Filtrar por bairro"
          variant="flat"
          size="md"
          placeholder="Filtrar por bairro"
          className="max-w-xs"
          onChange={(e) => handleSelectionChange(e, "bairro")}
        >
          {city == "niterio "
            ? listNiteroiNeighborhood.map((neighbourhood) => (
                <SelectItem key={neighbourhood.key}>
                  {neighbourhood.label}
                </SelectItem>
              ))
            : city == "nova iguacu"
            ? listNovaIguacuNeighborhood.map((neighbourhood) => (
                <SelectItem key={neighbourhood.key}>
                  {neighbourhood.label}
                </SelectItem>
              ))
            : city == "duque de caxias"
            ? listDuqueDeCaxiasNeighborhood.map((neighbourhood) => (
                <SelectItem key={neighbourhood.key}>
                  {neighbourhood.label}
                </SelectItem>
              ))
            : listSaoGoncaloNeighborhood.map((neighbourhood) => (
                <SelectItem key={neighbourhood.key}>
                  {neighbourhood.label}
                </SelectItem>
              ))}
        </Select>
        <Select
          aria-label="Filtrar por ensino"
          variant="flat"
          placeholder="Filtrar por ensino"
          selectedKeys={[ensino]}
          labelPlacement="outside"
          className="max-w-xs"
          onChange={(e) => handleSelectionChange(e, "ensino")}
        >
          {listGrausdeEnsino.map((ensino) => (
            <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
          ))}
        </Select>
        <Select
          aria-label="Filtrar por valor"
          variant="flat"
          placeholder="Filtrar por valor"
          selectedKeys={[valor]}
          labelPlacement="outside"
          className="max-w-xs"
          onChange={(e) => handleSelectionChange(e, "valor")}
        >
          {filtroporValor.map((valor) => (
            <SelectItem key={valor.key}>{valor.label}</SelectItem>
          ))}
        </Select>
        <Button color="secondary" onPress={handleSearch} radius="full">
          <SearchIcon />
        </Button>
      </div>
      <div className="flex flex-row items-center gap-4 flex-wrap my-12">
        <SchoolCard onOpen={onOpen} />
        <SchoolCard onOpen={onOpen} />
        <SchoolCard onOpen={onOpen} />
        <SchoolCard onOpen={onOpen} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-2xl font-semibold dark:text-purple-700 text-orange-600">
                  Nome da Escola
                </p>
                <small className="text-default-500">Cidade:</small>
                <small className="text-default-500">Valor:</small>
                <Chip startContent={<BiCheck />} variant="flat" color="success">
                  Tipo de Ensino
                </Chip>
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  //   width={270}
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  as={Link}
                  href="/bolsas/checkout/123"
                  color="success"
                  onPress={onClose}
                  endContent={<LuShoppingCart />}
                >
                  Adquirir Bolsa
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BolsasPage;
