import { forwardRef } from "react";

const Textarea = forwardRef(({ label, error, ...rest }, ref) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    <textarea ref={ref} {...rest} />
    {error && <p className="error-msg">{error.message}</p>}
  </div>
));

export default Textarea;
