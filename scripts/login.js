window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.querySelector("#formulario");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const urlApi = "https://ctd-todo-api.herokuapp.com/v1";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = {
      email: email.value,
      password: password.value,
    };
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    realizarLogin(settings);
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    fetch(`${urlApi}/users/login`, settings)
      .then((response) => {
        console.log(response);
        // compruebar el status
        if (response.ok != true) {
          alert("Alguno de los datos es incorrecto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Promesa cumplida");
        console.log(data);

        if (data.jwt) {
          // guardar en LocalStorage el objeto con el token
          localStorage.setItem("jwt", JSON.stringify(data.jwt));

          // redireccion a la pagina mis-tareas
          location.replace("./mis-tareas.html");
        }
      })
      .catch((error) => {
        console.log("Promesa rechazada");
        console.log(error);
      });
  }
});
