import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...rest }, ref) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    <input ref={ref} {...rest} />
    {error && <p className="error-msg">{error.message}</p>}
  </div>
));

export default Input;
