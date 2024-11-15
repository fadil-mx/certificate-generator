"use client";
import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";

const page = () => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="flex flex-col text-black  justify-center items-center gap-10 bg-black   ">
      <h1 className="font-bold   text-green-800 text-[50px]">CERTIFICATE</h1>
      <div className="relative " ref={ref}>
        <img src="cer.png" alt="certificate" width={1200} />

        <h1 className="absolute text top-0 ml-[630px] text-gold mt-[420px] m text-[30px]">
          FADIL SHEREEF
        </h1>
        <p className="absolute top-0  ml-[630px] mt-[627px]  text-[18.59px] font-bold">
          14-11-2024
        </p>
        <p className="absolute top-0  ml-[410px] mt-[772px]  text-[17.95px] font-bold">
          456-412-963-741
        </p>
      </div>
      <button className="text-white bg-green-500" onClick={onButtonClick}>
        Click me
      </button>
    </div>
  );
};

export default page;
