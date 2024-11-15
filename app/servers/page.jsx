"use client";
import React from "react";
import { data } from "../utils/serverdata";
const page = () => {
  return (
    <div>
      <h1>its for server</h1>
      <p>{data}</p>
    </div>
  );
};

export default page;
