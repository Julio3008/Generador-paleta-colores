const palleteContainer = document.getElementById("palleteContainer");
const notification = document.getElementById("notification");
const colorValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const PALLETE_SIZE = 5;

const createPallete = () => {
  palleteContainer.innerHTML = "";
  for (let i = 0; i < PALLETE_SIZE; i++) {
    const palleteElement = document.createElement("div");
    palleteElement.classList.add("palleteItem");

    // Añadir evento de clic para copiar el color
    palleteElement.addEventListener("click", function () {
      const colorHex = this.querySelector(".colorHex").textContent;
      copyToClipboard(colorHex);
    });

    palleteContainer.appendChild(palleteElement);
  }
  updatePallete();
};

const colorize = (element) => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomElement =
      colorValues[Math.floor(Math.random() * colorValues.length)];
    color += randomElement;
  }
  element.style.backgroundColor = color;
  element.innerHTML = `<span class='colorHex'>${color}</span>`;
};

const updatePallete = () => {
  for (let i = 0; i < palleteContainer.children.length; i++) {
    colorize(palleteContainer.children[i]);
  }
};

// Función para copiar al portapapeles
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification();
    })
    .catch((err) => {
      console.error("Error al copiar: ", err);

      // Fallback para navegadores que no soportan clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        showNotification();
      } catch (err) {
        console.error("Fallback: Error al copiar", err);
      }

      document.body.removeChild(textarea);
    });
};

// Mostrar notificación de copiado
const showNotification = () => {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
};

// Inicializar la paleta
createPallete();

// Permitir generar nuevos colores con la tecla espaciadora
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    updatePallete();
    event.preventDefault();
  }
});
