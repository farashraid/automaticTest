import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from 'react';
import App from "./App";


test('renders learn react link', () => {
  render(<App />); // render方法用于元素的渲染,render执行过后会把值注入大搜screen对象里
  const linkElement = screen.getByText(/learn react/i);//getByText 查询api
  // render和screen方法都是用了getQueriesForElement方法,获取了获取制定元素下的查询,Render 方法的主要意义其实是渲染,查询作为一个独立的全局对象 screen 暴露出来，可以有效区分渲染和查询的界限
  //所以我们在写 DOM 相关的单测时，更建议大家采用 screen 来获取 DOM 的 container 来查询
  // 同时render放测试用例外面,第一个测试用例执行完毕以后,react testing library会执行clean up,导致后面的测试用例获取不到screen
  expect(linkElement).toBeInTheDocument();
});