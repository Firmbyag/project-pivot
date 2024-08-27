"use client";
import { estadosBrasil, listGrausdeEnsino } from "@/utils";
// import { listGrausdeEnsino } from "@/utils";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@nextui-org/react";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { FaSchoolFlag } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { PiStudentDuotone } from "react-icons/pi";
import React, { useEffect } from "react";
import { pickFromLocalStorage } from "@/utils/localstorage";
import { decodeToken } from "@/utils/token";
import TabContentMinhasOfertas from "@/components/tabs/minhas-ofertas";
import TabContentMeusAlunos from "@/components/tabs/meus-alunos";

const LayoutGestor = () => {
  const { role } = decodeToken();

  useEffect(() => {
    if (role === "user") {
      window.location.href = "/";
    }
  });

  return (
    <div>
      <Tabs color="primary" variant="underlined" aria-label="Options">
        <Tab
          key="painel-gestor"
          title={
            <div className="flex items-center space-x-2">
              <PiChalkboardTeacherDuotone />
              <span>Painel do Gestor</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Bem vindo!</h3>
              </CardHeader>
              <CardBody>
                <span className="text-xs font-light">
                  Aqui você pode gerenciar o desempenho da página de sua escola,
                  conhecer as estratégias de seus concorrentes e aumentar a
                  captação de alunos.
                </span>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  Matrícula Antecipada 2025
                </h3>
              </CardHeader>
              <CardBody>
                <span className="text-xs font-light">
                  Cadastre agora suas vagas e garanta o melhor benefício como
                  parceiro
                </span>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button variant="solid" className="bg-orange-500 text-white">
                  Garantir
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Tab>
        <Tab
          key="minha-escola"
          title={
            <div className="flex items-center space-x-2">
              <FaSchoolFlag />
              <span>Minha Escola</span>
            </div>
          }
        >
          <Card>
            <CardHeader>
              <p className="text-lg font-semibold">Dados da Escola</p>
            </CardHeader>
            <CardBody>
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Sobre a escola"
                >
                  <div className="flex flex-col items-baseline max-w-sm gap-4">
                    <Input
                      label="Nome da Escola"
                      placeholder="ex: escola exemplo 123"
                    />
                    <Select label="Selecione o grau de ensino" className="max-w-xs">
                      {listGrausdeEnsino.map((ensino) => (
                        <SelectItem key={ensino.key}>{ensino.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Razão Social"
                      placeholder="sua razão social"
                    />
                    <Input label="CNPJ" placeholder="seu cnpj" />
                    <Input
                      label="Nome do Responsável pela Escola"
                      placeholder="nome do responsável"
                    />
                    <Input
                      label="CPF do Responsável "
                      placeholder="cpf do responsável pela instituição"
                    />
                    <Input
                      label="Cargo do Responsável "
                      placeholder="cargo do responsável pela instituição"
                    />
                    <Input
                      label="Email do Responsável "
                      placeholder="email do responsável pela instituição"
                    />
                    <Input
                      label="Celular do Responsável "
                      placeholder="celular do responsável pela instituição"
                    />
                    <Input
                      label="Nome da secretária principal "
                      placeholder="ex: maria aparecida da silva"
                    />
                    <Button className="bg-orange dark:bg-purple-600 text-white">
                      Salvar
                    </Button>
                  </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Endreço">
                  <div className="flex flex-col items-baseline max-w-sm gap-4">
                    <Input label="CEP" placeholder="xxxxx-xxx" />
                    <Input
                      label="Logradouro (rua, avenida)"
                      placeholder="logradouro do colégio"
                    />
                    <Input label="Número" placeholder="número do colégio" />
                    <Input
                      label="Complemento"
                      placeholder="digite o seu complemento"
                    />
                    <Input label="Bairro" placeholder="digite seu bairro" />
                    <Input label="Cidade " placeholder="digite sua cidade" />
                    <Select label="Selecione um estado" className="max-w-xs">
                      {estadosBrasil.map((estados) => (
                        <SelectItem key={estados.key}>
                          {estados.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button className="bg-orange-500 dark:bg-purple-600 text-white">
                      Salvar
                    </Button>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title="Mídias"
                ></AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title="Contatos"
                >
                  <div className="flex flex-col items-baseline max-w-sm gap-4">
                    <Input label="Telefone" placeholder="(xx) xxxxx-xxxx" />
                    <Input label="Celular" placeholder="(xx) xxxxx-xxxx" />
                    <Button className="bg-orange-500 dark:bg-purple-600 text-white">
                      Salvar
                    </Button>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Accordion 4"
                  title="Documentos Necessários para matrícula"
                >
                  <div className="flex flex-col items-baseline max-w-sm gap-4">
                    <Input label="Documento 1" placeholder="(xx) xxxxx-xxxx" />
                    <Input label="Documento 2" placeholder="(xx) xxxxx-xxxx" />
                    <div className="flex flex-row items-center gap-4">
                      <Button
                        variant="bordered"
                        // className="bg-orange dark:bg-purple-600 text-white"
                      >
                        Adicionar Campo
                      </Button>
                      <Button className="bg-orange-500 dark:bg-purple-600 text-white">
                        Salvar
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="minhas-ofertas"
          title={
            <div className="flex items-center space-x-2">
              <BiSolidOffer />
              <span>Minhas Ofertas</span>
            </div>
          }
        >
          <TabContentMinhasOfertas/>
        </Tab>
        <Tab
          key="meus-alunos"
          title={
            <div className="flex items-center space-x-2">
              <PiStudentDuotone />
              <span>Meus Alunos</span>
            </div>
          }
        >
          <TabContentMeusAlunos/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default LayoutGestor;
