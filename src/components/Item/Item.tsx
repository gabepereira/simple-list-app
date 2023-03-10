import { ListItem } from "@chakra-ui/react";

export type ItemType = {
  id: number;
  name: string;
};

interface ItemProps extends ItemType {}

export default function Item({ name }: ItemProps) {
  return <ListItem>{name}</ListItem>;
}
