import { Dispatch, useEffect, useRef } from "react";

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: any }) {

    const ref: any = useRef()

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if(ref.current && !ref.current.contains(event.target)){
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

  return (
    <div className="fixed top-0 w-[100vw] h-[100vh] bg-opacity-55 z-[1000] bg-dark flex items-center justify-center">
      <div className="bg-white text-primary p-6 w-[50vw] max-h-[80vh]" ref={ref}>{children}</div>
    </div>
  );
}
