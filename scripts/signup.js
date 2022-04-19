window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.querySelector("#formulario");
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const urlApi = "https://ctd-todo-api.herokuapp.com/v1";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = {
      firstName: nombre.value,
      lastName: apellido.value,
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

    realizarRegister(settings);
    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    fetch(`${urlApi}/users`, settings)
      .then((response) => {
        console.log(response);
        // comprueba el status
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
          location.replace("./mis-tareas.html");
        }
      })
      .catch((error) => {
        console.log("Promesa rechazada");
        console.log(error);
      });
  }
});
