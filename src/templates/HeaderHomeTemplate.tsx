import React from "react";
import CategoriesMenu from "../components/CategoriesMenu/CategoriesMenu";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";
type Props = {};

export default function HeaderHomeTemplate({}: Props) {
  return (
    <div>
      <Header />
      <CategoriesMenu />
      <Outlet />
      <Footer />
    </div>
  );
}
