"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React from "react";

const BolsaCheckoutPage = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-ror gap-8 items-center">
        <div className="flex flex-col flex-1">
          <div>
            <h2 className="text-lg text-primary font-semibold">
              ótimo, agora basta informar os seus dados de pagamento.
            </h2>
            <span className="font-light">
              preencha abaixo suas informações de pagamento para concluir a
              compra da bolsa
            </span>
          </div>
          <Card className="mt-4 p-2">
            <CardHeader>Informe seus dados pessoais</CardHeader>
            <CardBody className="flex flex-col gap-3">
              <Input
                label="Nome completo"
                placeholder="ex: Fernandes da Silva"
              />
              <Input label="CPF" placeholder="ex: 123.456.789-00" />
              <div className="flex flex-row items-center gap-3">
                <Input label="Email" placeholder="ex: email@gmail.com" />
                <Input
                  label="Telefone para contato"
                  placeholder="ex: (xx) xxxxx-xxxx"
                />
              </div>
            </CardBody>
          </Card>
          <Tabs variant="underlined" aria-label="Options" className="mt-4">
            <Tab key="card" title="Cartão de Crédito">
              <Card className="p-2">
                <CardBody className="flex flex-col gap-3">
                  <Input
                    label="Número do cartão"
                    placeholder="ex: xxxxxxxx-xxxx-xx"
                  />
                  <Input
                    label="Títular do cartão"
                    placeholder="ex: Fernandes da Silva"
                  />
                  <div className="flex flex-row items-center gap-3">
                    <Input label="Data de Valida" placeholder="ex: 02/30" />
                    <Input
                      label="CVC (código de segurança)"
                      placeholder="ex: 343"
                    />
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="pix" title="Pix">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
        <div className="flex flex-col flex-1">
          <Card>
            <CardHeader>Informações sobre a bolsa</CardHeader>
            <CardBody>
              descrição sobre a bolsa que será adquirida, valor, endereço, série, etc
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BolsaCheckoutPage;
