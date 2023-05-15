`use client`;

import React from "react";
import clsx from 'clsx';

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullwidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullwidth,
  children,
  onClick,
  secondary,
  disabled,
  danger,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(`
      flex,
      justify-center
      rounded-md
      px-4
      py-3
      transition
      text-sm
      font-semibold
      focus-visible:outline
      focus-visible:outline-2
     focus-visible:outline-offset-2
      ${disabled && `opacity-50 cursor-default`}
      ${fullwidth && 'w-full'}
     ${secondary ? `text-gray-500` : `text-white`}
     ${danger && `bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600`}
     ${!secondary && !danger && `bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`}

   
     `)}
    >
        {children}
    </button>
  );
};

export default Button;