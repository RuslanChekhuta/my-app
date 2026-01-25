import { forwardRef } from "react";

const Checkbox = forwardRef(({ label, error, ...rest }, ref) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    <input ref={ref} {...rest} type="checkbox" />
    {error && <p className="error-msg">{error.message}</p>}
  </div>
));

export default Checkbox;
