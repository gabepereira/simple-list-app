import testSetup from "@/utils/testSetup";
import { List } from "@chakra-ui/react";
import Item, { ItemType } from "./Item";

const item: ItemType = {
  id: 1,
  name: "Example Item",
};

describe("Item", () => {
  const { render } = testSetup(
    <List>
      <Item {...item} />
    </List>
  );

  it("renders the item id and name", () => {
    const { getByText } = render();

    expect(getByText(`${item.name}`)).toBeInTheDocument();
  });
});
