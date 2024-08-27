'use client';

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
  // onOpen: () => void;
  onClickVerBolsa: () => void;  
  title?: string;
  description?: string;
  value?: number;
  city?: string;
  image?: string;
  serie: string;
};

const SchoolCard = ({
  onClickVerBolsa,
  title,
  description,
  value,
  city,
  image,
  serie,
}: SchoolCardProps) => {
  return (
    <Card className="py-4 flex-1 min-w-72 max-w-72">
      <CardHeader className="flex gap-pb-0 pt-2 px-4 flex-col items-start">
        <p className="uppercase text-base font-bold">{title}</p>
        <small className="text-default-500">{city}</small>
        <small className="text-default-500">{value}</small>
        <Chip size="sm" startContent={<BiCheck />} variant="flat" color="success">
          Série: {serie}
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Button
          className="text-white"
          color="primary"
          size="sm"
          onPress={onClickVerBolsa}
        >
          Ver Bolsa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchoolCard;
