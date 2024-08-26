"use client";
import { getToken } from "@/utils/token";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
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
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { TbEyeDiscount } from "react-icons/tb";

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
  {
    key: "actions",
    label: "Ações",
  },
];

const statusColorMap = {
  Ativo: "success",
  inativo: "danger",
};

const TabContentMeusAlunos = () => {
  const [aluno, setAluno] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const escola_id = 1;

  const getAllAlunos = async () => {
    fetch(`http://localhost:4000/alunos/meus-alunos/${escola_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAlunos(data));
  };

  const onSaveAluno = async () => {
    const {
      nome_aluno,
      nome_responsavel,
      cpf_responsavel,
      serie_periodo,
      ano,
      status,
    } = getValues();

    try {
      const response = await fetch("http://localhost:4000/alunos/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          nome_aluno,
          nome_responsavel,
          cpf_responsavel,
          serie_periodo,
          ano,
          status,
          escola_id,
        }),
      });
      const data = await response.json();
      if (data) {
        getAllAlunos();
        toast.success("Aluno cadastrado com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao criar aluno");
    }
  };

  const onClickViewDetails = (user) => {
    Object.keys(user).map((key) => {
      setValue(key, user[key]);
    });
    onOpen();
  };
  const onClickEditDetails = (user: any) => {
    Object.keys(user).map((key) => {
      setValue(key, user[key]);
    });
    onOpen();
  };

  const onClickOpenModal = () => {
    setValue("nome_aluno", "");
    setValue("nome_responsavel", ""); 
    setValue("cpf_responsavel", "");
    setValue("serie_periodo", "");
    setValue("ano", "");
    setValue("status", "");
    onOpen();
  }

  const onClickDelete = async (user: any) => {
    try {
      const response = await fetch(`http://localhost:4000/alunos/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      if (data) {
        toast.success("Aluno deletado com sucesso");
        getAllAlunos();
      }
    } catch (error) {
      toast.error("Erro ao deletar aluno");
    }
  };

  const renderAlunoCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nome_aluno":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "https://nextui.org/images/avatar.jpg",
            }}
            description={user.serie_periodo}
            name={cellValue}
          >
            {user.nome_aluno}
          </User>
        );
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Detalhes">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <TbEyeDiscount
                  className="text-secondary"
                  onClick={() => onClickViewDetails(user)}
                />
              </span>
            </Tooltip>
            <Tooltip content="Editar aluno">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <BiEdit
                  className="text-primary"
                  onClick={() => onClickEditDetails(user)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deletar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <LuDelete
                  className="text-red-600"
                  onClick={() => onClickDelete(user)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    getAllAlunos();
  }, []);

  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-lg font-semibold">Meus Alunos</p>
            <Button color="primary" onPress={() => onClickOpenModal()}>
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
                      <TableCell>{renderAlunoCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                );
              }}
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
