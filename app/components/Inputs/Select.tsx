import { User } from "@prisma/client";
import React, { FC } from "react";
import ReactSelect from "react-select";
interface SelectProps {
  onChange: (value: Record<string, any>) => void;
  label: string;
  disabled: boolean;
  options: Record<string, any>[];
  value: Record<string, any>;
}
const Select: FC<SelectProps> = ({
  onChange,
  label,
  disabled,
  options,
  value,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <ReactSelect
        isDisabled={disabled}
        onChange={onChange}
        isMulti
        options={options}
        value={value}
        styles={{
            menuPortal : base => ({
                ...base,
                zIndex : 9999
            })
        }}
        classNames={{
            control : () => "text-sm"
        }}
        menuPortalTarget={document.body}
      />

      
    </div>
  );
};

export default Select;
