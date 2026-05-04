// Importa el hook useState de Preact
import { useState } from "preact/hooks";

// Define el componente funcional HamburgerMenu
const HamburgerMenu = () => {
  // Declara una variable de estado isOpen y una función setIsOpen para actualizarla
  const [isOpen, setIsOpen] = useState(false);

  // Define una función para alternar el estado del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Contenedor principal del menú hamburguesa, oculto en pantallas medianas y más grandes
    <div className="relative md:hidden">
      {/* Botón del menú hamburguesa */}
      <button
        onClick={toggleMenu} // Llama a toggleMenu al hacer clic
        type="button" // Tipo explícito añadido aquí
        className="flex items-center justify-center w-10 h-10 bg-[var(--color-bg)] text-white rounded-md focus:outline-none"
        aria-label="Toggle menu" // Etiqueta accesible para el botón
      >
        {/* SVG del icono del menú */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-list text-black dark:text-purple-600 hover:text-purple-600 dark:hover:text-purple-600" // Añadido para cambiar el color según el tema
          viewBox="0 0 16 16"
        >
          <title>Menu icon</title>
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="flex flex-col p-2">
            <li className="p-2 hover:bg-purple-200 text-purple-600">
              <a href="/">Home</a>
            </li>

            <li className="p-2 hover:bg-purple-200 text-purple-600">
              <a href="#services">Services</a>
            </li>

            <li className="p-2 hover:bg-purple-200 text-purple-600">
              <a href="#about">About</a>
            </li>

            <a href="#contact">
              <button
                type="button"
                className="w-32 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 flex items-center justify-center whitespace-nowrap"
              >
                Contact Us
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <style>
                    {`@keyframes notify{0%,to{transform:rotate(0deg);transform-origin:top center}10%,90%{transform:rotate(2deg)}20%,40%,60%{transform:rotate(-6deg)}30%,50%,70%{transform:rotate(6deg)}80%{transform:rotate(-2deg)}}`}
                  </style>
                  <g style="animation:notify 1s cubic-bezier(.455,.03,.515,.955) both infinite" stroke-width="1.5">
                    <path stroke="white" d="M12.29 3.398a5 5 0 00-5 5v2c0 .758-.441 1.505-1.005 2.012a3 3 0 002.005 5.232h8a3 3 0 002.006-5.232c-.564-.507-1.005-1.254-1.005-2.012v-2a5 5 0 00-5-5z"/>
                    <path stroke="white" stroke-linecap="round" d="M14.68 20.312l-.042.01a9.713 9.713 0 01-4.67-.01"/>
                  </g>
                </svg>
              </button>
            </a>
          </ul>
        </div>
      )}
    </div>
  );
};

// Exporta el componente HamburgerMenu como el valor predeterminado del módulo
export default HamburgerMenu;
