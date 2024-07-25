import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type propsType = {
    type:  'button' | 'submit' | 'reset' | undefined,
    onClick?: () => void,
    children: React.ReactNode, 
    variant?: string,
}

export default function Button(props: propsType) {
  const { type, onClick, children, variant} = props;

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`p-2 rounded-md text-white mt-2 flex justify-center font-semibold mx-auto ${variant}`}
      >
        {children}
      </button>
    </div>
  );
}
