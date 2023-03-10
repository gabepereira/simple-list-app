import "@testing-library/jest-dom";
import { cloneElement } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export default function testSetup<P>(Component: React.ReactElement<P>) {
  return {
    render: (
      props?: JSX.LibraryManagedAttributes<typeof Component, Partial<P>>
    ) =>
      render(<ChakraProvider>{cloneElement(Component, props)}</ChakraProvider>),
  };
}
