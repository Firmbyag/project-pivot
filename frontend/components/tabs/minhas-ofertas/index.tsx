"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
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
import React from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";

const TabContentMinhasOfertas = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSaveBolsa = () => {
    const {
      etapa,
      serie,
      turno,
      mensalidade_sem_desconto,
      desconto_na_mensalidade,
      vagas,
    } = getValues();
    console.log({
      etapa,
      serie,
      turno,
      mensalidade_sem_desconto,
      desconto_na_mensalidade,
      vagas,
    });
  };

  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-lg font-semibold">Minhas Ofertas</p>
            <Button color="primary" onPress={onOpen}>
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Série</TableColumn>
              <TableColumn>Turno</TableColumn>
              <TableColumn>Vagas</TableColumn>
              <TableColumn>Mensalidade sem desconto</TableColumn>
              <TableColumn>Ações</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    <Button isIconOnly variant="shadow" radius="full">
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
                    <Button isIconOnly variant="shadow" radius="full">
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
                    <Button isIconOnly variant="shadow" radius="full">
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
                    <Button isIconOnly variant="shadow" radius="full">
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
                    <Button isIconOnly variant="shadow" radius="full">
                      <BiEdit className="text-primary" />
                    </Button>
                    <Button isIconOnly variant="shadow" radius="full">
                      <LuDelete className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Bolsa</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  <Input
                    label="Etapa"
                    placeholder="etapa da bolsa"
                    labelPlacement="outside"
                    {...register("etapa", { required: true })}
                  />
                  <Input
                    label="Séria da bolsa"
                    placeholder="qual a série da bolsa"
                    labelPlacement="outside"
                    {...register("serie", { required: true })}
                  />
                  <Input
                    label="Turno"
                    placeholder="ex: matutino, vespertino, noturno"
                    labelPlacement="outside"
                    {...register("turno", { required: true })}
                  />
                  <Input
                    label="Mensalidade sem desconto"
                    placeholder="informe a mensalidade sem desconto"
                    labelPlacement="outside"
                    {...register("mensalidade_sem_desconto", { required: true })}
                  />
                  <Input
                    label="Desconto na Mensalidade"
                    placeholder="informe o desconto"
                    labelPlacement="outside"
                    {...register("desconto_na_mensalidade", { required: true })}
                  />
                  <Input
                    label="Valor da matrícula"
                    placeholder="informe o valor da matrícula"
                    labelPlacement="outside"
                    {...register("valor_da_matricula", { required: true })}
                  />
                  <Input
                    label="Qtd. de Vagas"
                    placeholder="informe a quantidade de vagas"
                    labelPlacement="outside"
                    {...register("vagas")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={onSaveBolsa}>
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

export default TabContentMinhasOfertas;
