"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type Propstype = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  placeholderreal?: string;
  visible?: boolean;
  handleVisible?: any;
  defaultValue?: string;
  disable?: boolean;
  onChange?: (e: any) => void;
};

export default function Input(props: Propstype) {
  const {
    label,
    name,
    type,
    placeholder,
    placeholderreal,
    visible,
    handleVisible,
    defaultValue,
    disable,
    onChange,
  } = props;

  const [value, setValue] = useState<string>();
  useEffect(() => {
    if (!value && placeholder) {
      setValue(placeholder);
    }
  }, [placeholder]);

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="mx-2">
        {label}
      </label>
      <input
      placeholder={placeholderreal}
        disabled={disable}
        id={name}
        name={name}
        type={type}
        className={`${
          disable && "text-gray-600"
        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-white/80 bg-primary rounded-xl`}
        value={value}
        onChange={onChange ? onChange : (e) => setValue(e.target.value)}
      />
    </div>
  );
}
