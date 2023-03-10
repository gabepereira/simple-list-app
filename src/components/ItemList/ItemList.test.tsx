import testSetup from "@/utils/testSetup";
import { fireEvent } from "@testing-library/react";
import ItemList from "./ItemList";

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

describe("ItemList", () => {
  const { render } = testSetup(<ItemList items={items} />);

  it("renders the list of items", () => {
    const { getByText } = render(<ItemList items={items} />);
    items.forEach((item) => {
      expect(getByText(`${item.name}`)).toBeInTheDocument();
    });
  });

  it("filters the list when the input changes", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <ItemList items={items} />
    );

    // type in filter input
    const filterInput = getByPlaceholderText("Filter");
    fireEvent.change(filterInput, { target: { value: "item 1" } });

    // expect only the filtered item to be in the list
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(queryByText("Item 2")).not.toBeInTheDocument();
    expect(queryByText("Item 3")).not.toBeInTheDocument();
  });

  it("calls the onFilter prop when the input changes", () => {
    const onFilterMock = jest.fn();
    const { getByPlaceholderText } = render({ onFilter: onFilterMock });

    // type in filter input
    const filterInput = getByPlaceholderText("Filter");
    fireEvent.change(filterInput, { target: { value: "item 1" } });

    // expect the onFilter prop to have been called with the filter value
    expect(onFilterMock).toHaveBeenCalledTimes(1);
    expect(onFilterMock).toHaveBeenCalledWith("item 1");
  });
});
