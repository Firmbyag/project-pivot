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
import { useRouter } from "next-nprogress-bar";
import React, { useEffect, useState } from "react";
import { BiCheck, BiCloset } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";

const BolsasPage = () => {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [bolsas, setBolsas] = useState([]);
  const [bolsa, setBolsa] = useState({});
  const [city, setCity] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [ensino, setEnsino] = useState("");
  // const [valor, setValor] = useState("");

  const fetchBolsas = async () => {
    const response = await fetch("http://localhost:4000/bolsas");
    const data = await response.json();
    setBolsas(data);
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleChangeNeighbourhood = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNeighbourhood(e.target.value);
  };

  const handleChangeEnsino = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnsino(e.target.value);
  };

  // const handleChangeValor = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setValor(e.target.value);
  // };

  const onClickVerBolsa = (bolsa) => {
    setBolsa(bolsa);
    onOpen();
  };

  const onClickFiltrar = async () => {
    const response = await fetch(
      `http://localhost:4000/bolsas/filtrar-bolsas/${city ? city : ""}${
        neighbourhood ? "/" + neighbourhood : ""
      }${ensino}`
    );
    const data = await response.json();
    setBolsas(data);
  };

  useEffect(() => {
    fetchBolsas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-col items-baseline">
        <p className="text-xl font-semibold text-secondary">
          Veja todas as bolsas cadastradas em nossa plataforma{" "}
        </p>
        <span className="text-xs font-light">
          aplique os filtros para ver as bolsas cadastradas
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Select
          label=""
          variant="bordered"
          radius="full"
          placeholder="Filtrar por cidade"
          selectedKeys={[city]}
          labelPlacement="outside"
          className="max-w-xs"
          endContent={ city.length > 0 && 
            <RiCloseLine
              onClick={() => setCity("")}
              className="text-primary cursor-pointer"
            />
          }
          onChange={handleChangeCity}
        >
          {navbarMenuCities.map((city) => (
            <SelectItem key={city.key}>{city.label}</SelectItem>
          ))}
        </Select>
        <Select
          label=""
          variant="bordered"
          radius="full"
          size="md"
          placeholder="Filtrar por bairro"
          selectedKeys={[neighbourhood]}
          endContent={ neighbourhood.length > 0 &&
            <RiCloseLine
              onClick={() => setNeighbourhood("")}
              className="text-primary cursor-pointer"
            />
          }
          className="max-w-xs"
          onChange={handleChangeNeighbourhood}
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
          label=""
          radius="full"
          variant="bordered"
          placeholder="Filtrar por ensino"
          selectedKeys={[ensino]}
          labelPlacement="outside"
          className="max-w-xs"
          endContent={
            ensino.length > 0 && (
              <RiCloseLine
                onClick={() => setEnsino("")}
                className="text-primary cursor-pointer"
              />
            )
          }
          onChange={handleChangeEnsino}
        >
          {listGrausdeEnsino.map((ensino) => (
            <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
          ))}
        </Select>
        {/* <Select
          label=""
          radius="full"
          variant="bordered"
          placeholder="Filtrar por valor"
          selectedKeys={[valor]}
          labelPlacement="outside"
          className="max-w-xs"
          // onChange={handleChangeValor}
        >
          {filtroporValor.map((ensino) => (
            <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
          ))}
        </Select> */}
        <Button
          color="secondary"
          isIconOnly
          radius="full"
          onPress={onClickFiltrar}
        >
          <SearchIcon className="text-white" />
        </Button>
      </div>
      <div className="flex flex-row items-center gap-4 flex-wrap my-12">
        {bolsas.length > 0 ? (
          bolsas.map((bolsa, index) => (
            <SchoolCard
              key={index}
              title={bolsa.nome}
              city={bolsa.cidade}
              value={bolsas.mensalidade_sem_desconto}
              description={bolsa.descricao}
              serie={bolsa.serie}
              image={
                "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              onClickVerBolsa={() => onClickVerBolsa(bolsa)}
            />
          ))
        ) : (
          <p className="text-center font-light">
            Desculpe, não encontramos nenhuma bolsa para estes filtros.
          </p>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-2xl font-semibold dark:text-secondary text-primary">
                  {bolsa.nome}
                </p>
                <small className="text-default-500">
                  Cidade:{bolsa.cidade}
                </small>
                <small className="text-default-500">
                  Valor: R${bolsa.mensalidade_sem_desconto}
                </small>
                <Chip startContent={<BiCheck />} variant="flat" color="success">
                  Série: {bolsa.serie}
                </Chip>
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  //   width={270}
                />
                <span className="font-semibold">Descrição:</span>
                <p className="font-light">{bolsa.descricao}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  as={Link}
                  href="/bolsas/checkout/123"
                  color="primary"
                  className="text-white"
                  onPress={() => router.push(`/bolsas/checkout/${bolsa.id}`)}
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
