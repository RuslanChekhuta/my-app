import { useState } from "react";

const SimpleForm = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <div className="section">
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("Enter pressed inside input");
            }
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{text}</p>
    </div>
  );
};

export default SimpleForm;
