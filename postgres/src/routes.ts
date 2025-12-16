import { UserController } from "./controller/UserController";
import { PhotoController } from "./controller/PhotoController";
import { PhotoMetaController } from "./controller/MetaController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "findIgnoreCase",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "post",
    route: "/photo",
    controller: PhotoController,
    action: "save",
  },
  {
    method: "get",
    route: "/photo",
    controller: PhotoController,
    action: "all",
  },
  {
    method: "get",
    route: "/photo/:id",
    controller: PhotoController,
    action: "one",
  },
  {
    method: "delete",
    route: "/photo/:id",
    controller: PhotoController,
    action: "remove",
  },
  {
    method: "delete",
    route: "/photo",
    controller: PhotoController,
    action: "removeAll",
  },
  {
    method: "get",
    route: "/meta",
    controller: PhotoMetaController,
    action: "all",
  },
  {
    method: "post",
    route: "/meta",
    controller: PhotoMetaController,
    action: "save",
  },
  {
    method: "delete",
    route: "/meta/:id",
    controller: PhotoMetaController,
    action: "remove",
  },
  {
    method: "delete",
    route: "/meta",
    controller: PhotoMetaController,
    action: "removeAll",
  },
];
