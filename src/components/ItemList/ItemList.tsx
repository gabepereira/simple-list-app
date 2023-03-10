import React, { useState } from "react";
import { Text, Input, List } from "@chakra-ui/react";

import Item from "../Item/Item";
import type { ItemType } from "../Item/Item";

interface ItemListProps {
  items: ItemType[];
  onFilter?: (filter: string) => void;
}

export default function ItemList({ items, onFilter }: ItemListProps) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onFilter && onFilter(newFilter);
  };

  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  return (
    <div>
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Filter list
      </Text>
      <Input
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
        mt={12}
      />
      <List mt={4}>
        {filteredItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </List>
    </div>
  );
}
