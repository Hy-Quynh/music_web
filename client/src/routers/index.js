import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import AdminAccount from "../pages/Admin/AdminAccount";
import AdminAlbum from "../pages/Admin/Album";
import AdminCategory from "../pages/Admin/Category";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLogin from "../pages/Admin/Login";
import AdminSinger from "../pages/Admin/Singer";
import UserAccount from "../pages/Admin/UserAccount";
import HomePage from "../pages/Client/HomePage";
import Login from "../pages/Client/Login";
import Register from "../pages/Client/Register";
import AdminSong from "../pages/Admin/Song";
import AdminCountry from "../pages/Admin/Country";
import AlbumPage from "../pages/Client/Album";
import CategoryPage from "../pages/Client/Category";
import NewSong from "../pages/Client/NewSong";
import AlbumDetail from "../pages/Client/AlbumDetail";
import CategoryDetail from "../pages/Client/CategoryDetail";
import CountryDetail from "../pages/Client/CountryDetail";
import SingerDetail from "../pages/Client/SingerDetail";
import SongDetail from "../pages/Client/SongDetail";
import AdminPrivateRouter from "./PrivateRouter/AdminPrivateRouter";

const ClientLayoutPage = [
  {
    path: "/",
    page: <HomePage />,
  },
  {
    path: "/album",
    page: <AlbumPage />,
  },
  {
    path: "/album/:id",
    page: <AlbumDetail />,
  },
  {
    path: "/category",
    page: <CategoryPage />,
  },
  {
    path: "/category/:id",
    page: <CategoryDetail />,
  },
  {
    path: "/singer/:id",
    page: <SingerDetail />,
  },
  {
    path: "/country/:id",
    page: <CountryDetail />,
  },
  {
    path: "/song/:id",
    page: <SongDetail />,
  },
  {
    path: "/login",
    page: <Login />,
  },
  {
    path: "/sign-up",
    page: <Register />,
  },
  {
    path: "/new-song",
    page: <NewSong />,
  },
];

const AdminLayoutPage = [
  {
    path: "/admin",
    page: <Dashboard />,
  },
  {
    path: "/admin/admin-account",
    page: <AdminAccount />,
  },
  {
    path: "/admin/user-account",
    page: <UserAccount />,
  },
  {
    path: "/admin/category",
    page: <AdminCategory />,
  },
  {
    path: "/admin/country",
    page: <AdminCountry />,
  },
  {
    path: "/admin/album",
    page: <AdminAlbum />,
  },
  {
    path: "/admin/singer",
    page: <AdminSinger />,
  },
  {
    path: "/admin/music",
    page: <AdminSong />,
  },
];

export default function MainRouter() {
  return (
    <Router>
      {ClientLayoutPage?.map((item, index) => {
        return (
          <Routes key={`client-router-${index}`}>
            <Route
              exact
              path={item.path}
              element={<ClientLayout>{item?.page}</ClientLayout>}
            />
          </Routes>
        );
      })}

      {AdminLayoutPage?.map((item, index) => {
        return (
          <Routes key={`admin-router-${index}`}>
            <Route
              exact
              path={item.path}
              element={<AdminPrivateRouter>{item?.page}</AdminPrivateRouter>}
            />
          </Routes>
        );
      })}
      <Routes>
        <Route exact path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}
