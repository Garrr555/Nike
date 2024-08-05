import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Propstype = {
    label?: string,
    name: string,
    type: string,
    placeholder?: string,
    visible?: boolean,
    handleVisible?: any,
    defaultValue?: string,
    disable?: boolean
}

export default function Input(props: Propstype) {

    const {label, name, type, placeholder, visible, handleVisible, defaultValue, disable} = props

  return (
    <div>
      <div className="flex items-center rounded-lg overflow-hidden">
        <label htmlFor={name} className="">
          {label}
        </label>
        <input
          name={name}
          id={name}
          type={visible? 'password' : ''}
          className={`w-full shadow-lg  bg-gray-200 p-1 focus:outline-none ${
            disable ? "opacity-60" : ""
          }`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disable}
        />
        <div
          onClick={handleVisible}
          className={`bg-gray-100 py-1 ${visible ? "px-[7px]" : "px-2"} ${
            disable ? "opacity-60" : ""
          } ${
            name === "password" ||
            name === "old-password" ||
            name === "new-password"
              ? ""
              : "hidden"
          }`}
        >
          {visible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </div>
      </div>
    </div>
  );
}
