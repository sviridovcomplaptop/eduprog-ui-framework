import React, { FC, useState } from "react";
import "./Input.scss";

export type TextInputProps = {
  label: string;
  maxLength?: number;
  inputType?: "text" | "tel" | "email" | "password";
  mask?: string;
  defaultValue?: string;
  onChange?: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onPaste?: (event?: React.ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event?: React.KeyboardEvent<HTMLInputElement>) => void;
  leftAdditional?: React.ReactNode;
  rightAdditional?: React.ReactNode;
};

const Input: FC<TextInputProps> = ({
  label,
  inputType = "text",
  maxLength,
  mask,
  defaultValue,
  onChange,
  onPaste,
  onKeyDown,
  leftAdditional,
  rightAdditional,
}) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const inputFocus = () => {
    setActive(!active);
  };

  const inputBlur = () => {
    setActive(!active);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (onChange && value) {
      onChange(value, event);
    }
  };

  const inputPaste = (
    event: React.ClipboardEvent<HTMLInputElement> | undefined
  ) => {
    if (onPaste) {
      onPaste(event);
    }
  };

  const inputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement> | undefined
  ) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div className="TextInput">
      <div className="TextInput-wrapper">
        <div
          className={[
            "TextInput-label",
            (active || value) && "TextInput-label-active",
          ].join(" ")}
        >
          {label}
        </div>

        <div className="TextInput-field">
          <div className="TextInput-left">{leftAdditional}</div>

          <input
            className="TextInput-control"
            type={inputType}
            maxLength={maxLength}
            placeholder={active ? mask : ""}
            onFocus={inputFocus}
            onBlur={inputBlur}
            value={value}
            onChange={(event) => inputChange(event)}
            onPaste={(event) => inputPaste(event)}
            onKeyDown={(event) => inputKeyDown(event)}
          />

          <div className="TextInput-right">{rightAdditional}</div>
        </div>
      </div>
    </div>
  );
};

export default Input;
