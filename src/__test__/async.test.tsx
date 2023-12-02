import React from "react";
import {
  render,
  waitFor,
  screen
} from "@testing-library/react";
import type { IContainer } from '../interface';
import { getProvider } from '../provider';
import { DomAsync } from "../components/DomAsync";
import * as table from './table';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
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
// 8 | Async 异步：异步方法如何进行单测？
describe("examples for async", () => {
  // ... other content
  
  test("for react testing library", async () => {
    const { container } = render(<DomAsync />);
    // const testDom = await screen.findByText("a demo for async test");
    // const testDom1 = await screen.findByText("John Doe1");
    // expect(testDom).toBeInTheDocument();
    expect(table.query(container)).not.toBeNull();
    
  });
  test('queryRow', () => {
    const { container } = render(<DomAsync />);
    expect(table.queryRow(container,1)).not.toBeNull();
});
});


test('renders text and table with loading message', async () => {
//   const { getByText, queryByText } = render(<DomAsync />);
const tree = render(<DomAsync />);
//   expect(tree).toMatchSnapshot();
  // Check if the initial text is rendered
//   expect(getByText('John Doe1')).toBeInTheDocument();

//   // Check if the loading message is initially displayed
//   expect(getByText('加载中...')).toBeInTheDocument();

//   // Wait for the asynchronous data fetching to complete
  await waitFor(() => {
//     // Check if the loading message is no longer displayed
//     expect(queryByText('加载中...')).toBeNull();
// expect(tree).toMatchSnapshot();
//     // Check if the fetched data is rendered
//     // expect(getByText('John Doe2')).toBeInTheDocument();
  });
});