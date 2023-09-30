// ventana formulario
const btnAbrirModal = document.querySelector("#btn-abrir-modal")
const btnCerrarModal = document.querySelector("#btn-cerrar-modal")
const modal = document.querySelector("#modal")

// abrir modal
btnAbrirModal.addEventListener("click", () => {
  modal.showModal()
})
// cerrar modal
btnCerrarModal.addEventListener("click", () => {
  modal.close()
})


//! envio de datos
// evento
document.getElementById("miForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Obtener los valores
  const nombre = document.getElementById("idname").value;
  const categoria = document.getElementById("idcateg").value;
  const precio = document.getElementById("idprecio").value;
  const valorT = document.getElementById("valorT").value;
  const stock = document.getElementById("idstock").value;
  // Crear un objeto de datos para enviar al servidor
  const datos = {
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    valorT: valorT,
    stock: stock
  };

  // Realizar metodo POST a la API
  fetch('https://shop-store-db-production.up.railway.app/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      document.getElementById("miForm").reset();

    })
    .catch(error => {
      console.error('Error:', error);
    });
});

//! metodo get
// metodo get
async function mostrarElementos() {
  try {
    const response = await fetch('https://shop-store-db-production.up.railway.app/api/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const listaElementos = document.getElementById('listaElementos');


    listaElementos.innerHTML = '';

    // Iterar sobre los elementos 
    data.forEach(elemento => {
      const li = document.createElement('li');
      const pId = document.createElement('p');
      pId.textContent = `ID: ${elemento.id}`;

      const pNombre = document.createElement('p');
      pNombre.textContent = `Nombre: ${elemento.Nombre}`;

      const pCategoria = document.createElement('p');
      pCategoria.textContent = `categoria: ${elemento.categoria}`;

      const pPrecio = document.createElement('p');
      pPrecio.textContent = `Precio: ${elemento.precio}`;
      const pValor = document.createElement('p');
      pValor.textContent = `valorT: ${elemento.valorT}`;
      const pStock = document.createElement('p');
      pStock.textContent = `Stock: ${elemento.stock}`;
      // eliminar
      const eliminarBtn = document.createElement('button');
      eliminarBtn.className = 'eliminarBtn';
      eliminarBtn.textContent = 'Eliminar';

      // const actualizarBtn = document.createElement('button');
      // actualizarBtn.className = 'ActualizarBtn';
      // actualizarBtn.textContent = 'Actualizar';



      // Agregar un manejador de eventos al botón "Eliminar"
      eliminarBtn.addEventListener('click', async () => {
        await eliminarElemento(elemento.id);
        await mostrarElementos();
      });


      li.appendChild(pId);
      li.appendChild(pNombre);
      li.appendChild(pCategoria);
      li.appendChild(pPrecio);
      li.appendChild(pValor);
      li.appendChild(pStock);
      li.appendChild(eliminarBtn);
      // li.appendChild(actualizarBtn);

      listaElementos.appendChild(li);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función  eliminar un elemento por ID
async function eliminarElemento(id) {
  try {
    const response = await fetch(`https://shop-store-db-production.up.railway.app/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el elemento: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Llamar a la función para mostrar los elementos al cargar la página
mostrarElementos();

