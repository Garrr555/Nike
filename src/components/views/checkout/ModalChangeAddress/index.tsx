"use client";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";

type PropTypes = {
  address: any;
  setChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: number;
};

export default function ModalChangeAddress(props: PropTypes) {
  const { address, setChangeAddress, selectedAddress, setSelectedAddress } =
    props;

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-2xl font-semibold mb-5">Change Shipping Address?</h1>
      {address.map((item: any, id: number) => (
        <div
          key={item.addressLine}
          className={`${
            id === selectedAddress && "border-accent"
          } bg-primary border p-3 rounded-lg mt-5 cursor-pointer`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          <div className="flex flex-col gap-1">
            <p
              className={`${
                id === selectedAddress && "text-accent"
              } font-bold text-lg`}
            >
              Name: {item.recipient}
            </p>
            <p>Phone: {item.phone}</p>
            <p>Address: {item.addressLine}</p>
            <p>Note: {item.note}</p>
          </div>
        </div>
      ))}
    </Modal>
  );
}
