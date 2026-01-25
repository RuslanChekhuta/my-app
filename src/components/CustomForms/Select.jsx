import { forwardRef } from "react";

const Select = forwardRef(({ options, label, error, ...rest }, ref) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    <select ref={ref} {...rest}>
      <option value="">Выберите...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="error-msg">{error.message}</p>}
  </div>
));

export default Select;
