type PropsTypes = {
    variant?: string;
    message?: string;
}

const toasterVariant:any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
  },
};

export default function Toaster(props: PropsTypes){
    const {variant = 'success', message} = props

    console.log(variant)

    function variantClass(e:string){
        if(variant === e){
            return 'bg-primary'
        }
        else{
            return ''
        }
    }
    return (
      <div
        className={`fixed right-5 bottom-5 z-[9999] border shadow-custom rounded-[10px] py-5 px-10 transform -translate-x-1/2 overflow-hidden ${variantClass('')}`}
      >
        <div className="">
          <div className="">
            <i className={`bx ${toasterVariant["success"].icon}`}></i>
          </div>
          <div className="font-semibold">
            <p className="">{toasterVariant["success"].title}</p>
            <p className="">{message}</p>
          </div>
        </div>
        <div
          className={`w-full h-[6px] absolute bottom-0 left-0 ${variantClass('success')}`}
        ></div>
      </div>
    );
}