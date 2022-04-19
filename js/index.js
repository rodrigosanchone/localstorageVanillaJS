//alert('funciona')

const formularioUI= document.querySelector('#formulario');
const listaActividadesUI= document.querySelector('#listaActividades');

let arrayActividades=JSON.parse(localStorage.getItem('rutina'))||[];




//funciones

const CrearItem =(actividad)=>{
    let item={
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);

    return item;
}


const guardarDB=()=>{
   localStorage.setItem('rutina', JSON.stringify(arrayActividades));
   pintarDB()
}

const pintarDB=()=>{
    listaActividadesUI.innerHTML='';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'))

    if(arrayActividades===null){
        arrayActividades=[];
    }else{
        arrayActividades.forEach(element => {
             
            if(element.estado){
                listaActividadesUI.innerHTML+=`<div class="alert alert-success 
             "role="alert"><span class="material-icons float-start me-3">settings_accessibility</span><b>${element.actividad}</b>
             ${element.estado}<span class="float-end"><span 
            class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
            }else{
                listaActividadesUI.innerHTML+=`<div class="alert alert-danger 
                "role="alert"><span class="material-icons float-start me-3">settings_accessibility</span><b>${element.actividad}</b>
                ${element.estado}<span class="float-end"><span 
               class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
            }

           
        });
    }
}

const eliminarDB=(actividad)=>{
  // console.log(actividad)
  arrayActividades.forEach((element, index)=>{
      if(element.actividad===actividad){
        indexArray=index;
      } 
  });
   arrayActividades.splice(indexArray,1);
   guardarDB();
}

const edirtarDB=(actividad)=>{
   let indexArray= arrayActividades.findIndex((elemento)=>
     elemento.actividad===actividad
   );

   console.log(arrayActividades[indexArray])

   arrayActividades[indexArray].estado=true;

   guardarDB();
}

//eventos
formularioUI.addEventListener('submit',(e)=>{
    e.preventDefault();
    var info = new FormData(formularioUI);
     var actividad= info.get('actividad')
     //console.log(actividad)
     CrearItem(actividad)
     guardarDB()
     pintarDB()
     formularioUI.reset()
});

document.addEventListener('DOMContentLoaded', pintarDB);

listaActividadesUI.addEventListener('click', (e)=>{
    e.preventDefault()
   

    if(e.target.innerHTML==='done'|| e.target.innerHTML==='delete'){
        const texto=e.path[2].childNodes[1].innerHTML
        if(e.target.innerHTML==='delete'){
           eliminarDB(texto)
        }
        if(e.target.innerHTML==='done'){
        edirtarDB(texto);
        }
    }
})

