// express 앱 설정
import "reflect-metadata";
import express from "express";

export function createApp() {
  const app = express();

  app.use();
  return app;
}
