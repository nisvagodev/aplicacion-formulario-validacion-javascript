# Aplicación de Validación de Formulario con Firebase

Link para ver resultado: [FORMULARIO CON FIREBASE FINALIZADO](https://formulario-validacion-project.netlify.app/)

![Captura de pantalla del proyecto de Clima](https://github.com/nisvagodev/aplicacion-formulario-validacion-javascript/blob/main/assets/img/captura-de-pantalla.PNG?raw=true)

La aplicación permite a los usuarios ingresar su nombre, correo electrónico y contraseña, y luego guarda los datos en una base de datos de Firebase. A continuación, se explica el funcionamiento del código JavaScript:

## Configuración de Firebase

Se obtiene los datos de configuración necesarios de Firebase. Se debe tener una cuenta de Firebase y un proyecto configurado. Luego, reemplazar los valores de `API_KEY`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` y `measurementId` en el objeto `firebaseConfig` con los valores correspondientes proporcionados por Firebase.

    const firebaseConfig = {
      apiKey: "API_KEY",
      authDomain: "authDomain",
      projectId: "datos-de-formulario",
      storageBucket: "datos-de-formulario.appspot.com",
      messagingSenderId: "messagingSenderId",
      appId: "appId",
      measurementId: "measurementId"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

## Inicialización de Firestore

Después de configurar Firebase, inicializamos Firestore y obtenemos una referencia al servicio. Esto nos permite interactuar con la base de datos de Firebase.

    const db = firebase.firestore();

## Validación del Formulario

El siguiente paso es validar los campos del formulario cuando se envía. Se agrega un evento de escucha al elemento con el ID "formulario" para capturar el evento de envío.

    document.getElementById('formulario').addEventListener('submit', (event) => {
      event.preventDefault();
      // Código de validación del formulario
    });

Dentro del evento de envío, se realiza la validación de los campos del formulario uno por uno.

### Validación del campo de nombre

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
      errorNombre.textContent = 'Por favor, introducí tu nombre';
      errorNombre.classList.add('error-message');
    } else {
      errorNombre.textContent = '';
      errorNombre.classList.remove('error-message');
    }

Verificamos si el valor del campo de nombre está en blanco. Si es así, mostramos un mensaje de error y aplicamos una clase CSS para resaltar el error. De lo contrario, eliminamos cualquier mensaje de error y la clase CSS correspondiente.

### Validación del correo electrónico

    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
      emailError.textContent = 'Por favor, introducí un mail válido';
      emailError.classList.add('error-message');
    } else {
      emailError.textContent = '';
      emailError.classList.remove('error-message');
    }

Utilizamos una expresión regular (`emailPattern`) para validar el formato básico de una dirección de correo electrónico. Si el valor del campo de correo electrónico no cumple con el patrón, mostramos un mensaje de error y aplicamos la clase CSS correspondiente.

### Validación de la contraseña

    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
    }

Utilizamos otra expresión regular (`contrasenaPattern`) para validar la contraseña. La contraseña debe tener entre 8 y 15 caracteres, al menos una letra minúscula, una letra mayúscula, un número y un carácter especial. Si la contraseña no cumple con el patrón, mostramos un mensaje de error y aplicamos la clase CSS correspondiente.

### Envío del formulario y almacenamiento en Firebase

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
      db.collection("users").add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value
      })
      .then((docRef) => {
        alert('El formulario se ha enviado con éxito', docRef.id);
        document.getElementById('formulario').reset();
      })
      .catch((error) => {
        alert(error);
      });
    }

Si no hay mensajes de error en ninguno de los campos, procedemos a enviar el formulario. Utilizamos la función `add()` de Firestore para agregar un nuevo documento a la colección "users" en la base de datos de Firebase. El documento contiene los valores ingresados en los campos del formulario. Si el envío es exitoso, mostramos una alerta con un mensaje de éxito y restablecemos el formulario. Si ocurre algún error, mostramos una alerta con el mensaje de error.
