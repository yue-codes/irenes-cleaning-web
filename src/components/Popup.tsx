import type { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (
    event: h.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    event.preventDefault();

    // Verificar palabras prohibidas
    const forbiddenWords = ["scam", "scammer", "scamming", "scammed"];
    const inputText = (name + " " + phoneNumber).toLowerCase();

    if (forbiddenWords.some((word) => inputText.includes(word))) {
      alert("Thank you for your message! We will get back to you soon.");
      closePopup();
      return;
    }

    // Enviar el formulario manualmente
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        alert("Thank you for your message! We will get back to you soon.");
        closePopup();
      } else {
        alert("Thank you for your message! We will get back to you soon.");
        closePopup();
      }
    } catch (error) {
      alert("Thank you for your message! We will get back to you soon.");
      closePopup();
    }
  };

  return (
    isVisible && (
      <div style={popupStyle}>
        <div style={popupContentStyle}>
          <button type="button" style={closeButtonStyle} onClick={closePopup}>
            ×
          </button>
          <h2 class="text-sm font-semibold uppercase tracking-widest text-purple-600">
            Claim Your 20% Discount!
          </h2>
          <p class="mt-6 text-2xl font-bold">
            Enter your phone number and get ready for a spotless home.
          </p>
          <form
            id="20% off"
            action="https://formspree.io/f/movqlyww"
            method="POST"
            onSubmit={handleSubmit}
          >
            <label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                required
                placeholder="Your name"
                style={inputStyle}
              />
            </label>
            <label>
              <input
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber((e.target as HTMLInputElement).value)
                }
                required
                placeholder="Your number: 201-523-8741"
                style={inputStyle}
              />
            </label>
            <button type="submit" style={submitButtonStyle}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

const popupStyle: h.JSX.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Asegura que el popup esté por encima de todo
};

const popupContentStyle: h.JSX.CSSProperties = {
  position: "relative",
  backgroundColor: "#f0f0f0", // Color gris claro
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "90%",
};

const closeButtonStyle: h.JSX.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const inputStyle: h.JSX.CSSProperties = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const submitButtonStyle: h.JSX.CSSProperties = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#a854f7", // Color morado
  color: "white",
  border: "none",
  borderRadius: "20px", // Bordes redondeados
  cursor: "pointer",
  width: "100%",
};

export default Popup;
