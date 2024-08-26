import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  //   CheckboxIcon,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import React from "react";
import { BiCheck } from "react-icons/bi";

type SchoolCardProps = {
  onOpen: () => void;
  title?: string;
  description?: string;
  value?: number;
  city?: string;
  image?: string;
};

const SchoolCard = ({
  onOpen,
  title,
  description,
  value,
  city,
  image,
}: SchoolCardProps) => {
  return (
    <Card className="py-4 flex-1">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Nome da Escola</p>
        <small className="text-default-500">Cidade:</small>
        <small className="text-default-500">Valor:</small>
        <Chip startContent={<BiCheck />} variant="flat" color="success">
          Tipo de Ensino
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Button className="text-white" color="primary" size="sm" onPress={onOpen}>
          Ver Bolsa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchoolCard;
