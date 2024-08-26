"use client";
import { getToken } from "@/utils/token";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  getKeyValue,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const columns = [
  {
    key: "nome_aluno",
    label: "Nome",
  },
  {
    key: "nome_responsavel",
    label: "Responsável",
  },
  {
    key: "serie_periodo",
    label: "Série / Período",
  },
  {
    key: "status",
    label: "Status",
  },
];

const TabContentMeusAlunos = () => {
  const [aluno, setAluno] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSaveAluno = () => {
    const {
      nome_aluno,
      nome_responsavel,
      cpf_responsavel,
      serie_periodo,
      ano,
      status,
    } = getValues();
  };

  const escola_id = 1;

  useEffect(() => {
    fetch(`http://localhost:4000/alunos/meus-alunos/${escola_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAlunos(data));
  }, []);

  console.log("alunos", alunos);

  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-lg font-semibold">Meus Alunos</p>
            <Button color="primary" onPress={onOpen}>
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Example static collection table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={alunos}>
              {(item) => {
                console.log("item", item);
                return (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                );
              }}
              {/* <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      isIconOnly
                      onPress={onOpen}
                      variant="shadow"
                      radius="full"
                    >
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
                <TableCell>Paused</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      isIconOnly
                      onPress={onOpen}
                      variant="shadow"
                      radius="full"
                    >
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      isIconOnly
                      onPress={onOpen}
                      variant="shadow"
                      radius="full"
                    >
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      isIconOnly
                      onPress={onOpen}
                      variant="shadow"
                      radius="full"
                    >
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button
                      isIconOnly
                      onPress={onOpen}
                      variant="shadow"
                      radius="full"
                    >
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Aluno</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  <Input
                    label="Nome do aluno"
                    placeholder="nome do aluno"
                    labelPlacement="outside"
                    {...register("nome_aluno", { required: true })}
                  />
                  <Input
                    label="Nome do Responsável"
                    placeholder="nome do responsável pelo aluno"
                    labelPlacement="outside"
                    {...register("nome_responsavel", { required: true })}
                  />
                  <Input
                    label="CPF do Responsável"
                    placeholder="cpf do responsável"
                    labelPlacement="outside"
                    {...register("cpf_responsavel", { required: true })}
                  />
                  <Input
                    label="Série"
                    placeholder="série do aluno"
                    labelPlacement="outside"
                    {...register("serie_periodo", { required: true })}
                  />
                  <Input
                    label="Ano"
                    placeholder="ano do aluno"
                    labelPlacement="outside"
                    {...register("ano", { required: true })}
                  />
                  <Input
                    label="Status"
                    placeholder="nome do aluno"
                    labelPlacement="outside"
                    {...register("status")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={onSaveAluno}>
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TabContentMeusAlunos;
