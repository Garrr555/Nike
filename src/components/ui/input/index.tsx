import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Propstype = {
    label?: string,
    name: string,
    type: string,
    placeholder?: string,
    visible?: boolean,
    handleVisible?: any,
}

export default function Input(props: Propstype) {

    const {label, name, type, placeholder, visible, handleVisible} = props

  return (
    <div>
      <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
        <label htmlFor={name} className="">
          {label}
        </label>
        <input
          name={name}
          id={name}
          type={`${visible ? type : `text`}`}
          className="w-full  bg-gray-100 p-1 focus:outline-none"
          placeholder={placeholder}
        />
        <div
          onClick={handleVisible}
          className={`bg-gray-100 py-1 ${visible ? "px-[7px]" : "px-2"} ${
            name === 'password' ? "" : "hidden"
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
