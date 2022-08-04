//variables 
const formulario = document.querySelector('#agregar-gasto');
const gastoListdo = document.querySelector('#gastos ul');
//const btnEliminar = document.querySelector('#gastos ul button');


//eventos
eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
    //btnEliminar.addEventListener('click',eliminarItem);
}
//Clases
class Presupuesto {
    //creando objeto principal 
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    //añadiendo los gastos al arreglo this.gastos
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarItemGasto(){
        this.gastos = this.gastos.filter( gasto => gasto.id !==id);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    insertarMensajeUI(mensaje, tipo) {
        const Divmensaje = document.createElement('div');
        Divmensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            Divmensaje.classList.add('alert-danger');
        } else {
            Divmensaje.classList.add('alert-success')
        }
        Divmensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(Divmensaje, formulario);
        setTimeout(() => {
            Divmensaje.remove();
        }, 2000);
    }

    agregandoGastosListados(gastos) {
        this.limpiarHtml();
        gastos.forEach(gastos => {
            const { cantidad, nombre, id } = gastos;

            const DivLista = document.createElement('li');
            DivLista.className = 'list-group-item d-flex justify-content-between aling-items-center';
            DivLista.dataset.id = id;

            DivLista.innerHTML = `${nombre} <spam class="badge badge-primary badge-pill"> ${cantidad}</spam>`;
            const btnBorroar = document.createElement('button');
            btnBorroar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorroar.innerHTML = 'Borrar &times'
            btnBorroar.onclick = ()=>{
                eliminarItem(id);
            }
            DivLista.appendChild(btnBorroar);
            gastoListdo.appendChild(DivLista);

        })
    }
    limpiarHtml(){
        while(gastoListdo.firstChild){
            gastoListdo.removeChild(gastoListdo.firstChild);
        }
    }
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
        const divAlert = document.querySelector('.restante');
            
        if(restante <= 500 && restante > 300){
            console.log('se esta terminando tu dinero');
            divAlert.classList.remove('alert-success');
            divAlert.classList.add('alert-warning');
        }else if(restante <=300){
            console.log('se esta terminando tu dinero');
            divAlert.classList.remove('alert-warning');
            divAlert.classList.add('alert-danger');
        } 
    }
    
}

    function eliminarItem(id){
        const DivLista = document.querySelector('#gastos ul li');
        DivLista.remove(id);
    }
// creando instancias
const ui = new UI();
let presupuesto = new Presupuesto();


//funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('cual es tu presupuesto');
    //validando datos del prompt
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    } else {
        presupuesto = new Presupuesto(presupuestoUsuario);
        ui.insertarPresupuesto(presupuesto);
    }
}


function agregarGasto(event) {
    event.preventDefault();
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    //validando formulario
    if (nombre === '' || cantidad === '') {
        console.log('llenar campos')
        ui.insertarMensajeUI('Ambos campos requeridos', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.insertarMensajeUI('Cantidad no valida', 'error');
        return;
    }
    ui.insertarMensajeUI('Correcto', 'succes');
    //creando nuevo gasto y creando nuevo objeto
    const gasto = { nombre, cantidad, id: Date.now() }
    //añade nuevo gasto
    presupuesto.nuevoGasto(gasto);
    const { gastos, restante } = presupuesto;

    ui.agregandoGastosListados(gastos);
    ui.actualizarRestante(restante);
    formulario.reset();
}
