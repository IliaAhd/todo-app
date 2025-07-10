import { ReactSVG } from "react-svg";

interface CheckBoxProps {
  className?: string;
  onClick?: () => void;
  onChange?: () => void;
  disabled?: boolean;
  checked?: boolean;
}

export default function CheckBox({
  className,
  onClick,
  disabled,
  onChange,
  checked,
}: CheckBoxProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {disabled ? (
        <button
          onClick={onClick}
          className="size-7 cursor-pointer appearance-none rounded-full shadow hover:shadow-md border border-very-grayish-blue dark:border-dark-very-dark-grayish-blue"
        ></button>
      ) : (
        <label
          className="flex items-center justify-center cursor-pointer relative"
          htmlFor="check"
        >
          <input
            onChange={onChange}
            disabled={disabled}
            checked={checked}
            type="checkbox"
            id="check"
            className="peer size-7 cursor-pointer appearance-none rounded-full shadow hover:shadow-md border border-very-grayish-blue checked:bg-gradient-to-br from-from to-to checked:border-0 dark:border-dark-very-dark-grayish-blue"
          />
          <ReactSVG
            className="absolute text-white hidden peer-checked:block top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="/icon-check.svg"
          />
        </label>
      )}
    </div>
  );
}
