"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Textarea from "@/components/ui/TextArea";
import userServices from "@/services/user";
import { profile } from "console";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type PropTypes = {
  profile: any;
  setChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: number;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function ModalChangeAddress(props: PropTypes) {
  const {
    profile,
    setChangeAddress,
    selectedAddress,
    setSelectedAddress,
    setToaster,
    setProfile,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const session: any = useSession();
  const token = session.data?.accessToken;
  const id = session.data?.user.id;
  console.log(token);
  console.log(id);

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      address: [
        ...profile.address,
        {
          recipient: form.recipient.value,
          phone: form.phone.value,
          addressLine: form.addressLine.value,
          note: form.note.value,
        },
      ],
    };
    try {
      const result = await userServices.updateProfile(id, data, token);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({ message: "Success Add New Address", type: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ message: "Failed Change Address", type: "error" });
    }

    console.log(data);
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-2xl font-semibold mb-5">Change Shipping Address?</h1>
      {profile.address.map((item: any, id: number) => (
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
      <div className="my-5">
        <Button
          type="button"
          bgcolor="bg-accent rounded-xl"
          textcolor="text-secondary"
          onClick={() => setIsAddNew(!isAddNew)}
        >
          {isAddNew ? "Cancel" : "Add New Address"}
        </Button>
      </div>
      {isAddNew && (
        <div className="border border-white/80 rounded-lg p-4">
          <form onSubmit={handleAddAddress} className="flex flex-col gap-5">
            <Input
              type="text"
              name="recipient"
              placeholderreal="Insert Recipient"
              label="Recipient"
            />
            <Input
              type="number"
              name="phone"
              placeholderreal="Insert Phone"
              label="Recipient Phone"
            />
            <Textarea
              name="addressLine"
              label="Address Line"
              placeholderreal="Insert Address Line"
            />
            <Input
              type="text"
              name="note"
              label="Note"
              placeholderreal="Insert Note"
            />
            <Button
              type="submit"
              bgcolor="bg-accent rounded-xl"
              textcolor="text-primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
