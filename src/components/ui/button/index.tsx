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
        className={`p-2 text-white w-full mt-2 flex justify-center ${variant}`}
      >
        {children}
      </button>
    </div>
  );
}
