import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Para almacenar el mensaje de error
  //Register
  const createUser = (data) => {
    const url = `${import.meta.env.VITE_API_URL}/users`;

    axios
      .post(url, data)
      .then((res) => res.data)
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Login
  const loginUser = (data) => {
    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    setError(null); // Reinicia el estado de error
    setIsLoading(true); // Reinicia el estado de carga

    axios
      .post(url, data)
      .then((res) => {
        // Guarda el token y la información del usuario en el localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userLogged", JSON.stringify(res.data.user));
        console.log("Inicio de sesión exitoso:", res.data);

        Swal.fire({
          title: "¡Inicio de sesión exitoso!",
          text: "Bienvenido de nuevo, has iniciado sesión correctamente.",
          icon: "success", // Ícono de éxito
          confirmButtonText: "Continuar",
          confirmButtonColor: "#4CAF50", // Verde profesional
          timer: 3000, // Modal se cierra automáticamente en 3 segundos
        });
      })
      .catch((err) => {
        console.error("Error al iniciar sesión:", err);
        if (err.res?.status === 401) {
          Swal.fire({
            title: "Error de autenticación",
            text: "Las credenciales proporcionadas no son válidas. Por favor, inténtalo de nuevo.",
            icon: "error", // Ícono de error
            confirmButtonText: "Reintentar",
            confirmButtonColor: "#F44336", // Rojo profesional
          });
        } else {
          Swal.fire({
            title: "Error en el servidor",
            text: "Hubo un problema con el inicio de sesión. Por favor, intenta más tarde.",
            icon: "error",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#F44336",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { createUser, loginUser, isLoading, error };
};

export default useAuth;
