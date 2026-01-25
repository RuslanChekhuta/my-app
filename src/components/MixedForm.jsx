import { useRef, useState } from "react";

const MixedForm = () => {
  // TODO: Реализуйте логику здесь.

  const [name, setName] = useState("");

  const aboutRef = useRef(null);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (!/\d/.test(value)) {
      setName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, about: aboutRef.current.value });
  };

  return (
    <div className="form-container">
      <h3>Mixed Form</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name (no digits): </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name..."
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>About you: </label>
          <textarea ref={aboutRef} placeholder="Tell us something long..." />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MixedForm;
