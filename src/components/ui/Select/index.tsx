type Option = {
    label: string
    value: string
}

type Propstype = {
  label?: string;
  name: string;
  defaultValue?: string;
  disable?: boolean;
  options: Option[]
};

export default function Select(props: Propstype) {

    const {label, name, defaultValue, disable, options} = props

  return (
    <div className="flex flex-col my-5">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} defaultValue={defaultValue} disabled={disable} className="p-[15px] bg-dark text-white mt-[5px] border-none outline-none">
        {options.map((option)=>(
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        ))}
      </select>
    </div>
  );
}
