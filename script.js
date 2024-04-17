
const objt = {
    "c9_tasks": [

        {
            id: 1,
            content: 'Agendar un espacio de 1 hora para brindar feedback al Jefe de sección con relación a los resultados obtenidos en su evaluación de desempeño.',
                status:1
        },
        {
            id: 2,
            content: "Agendar espacio de 1 hora para brindar feedback a colaboradores mandos medios ( Jefe de sección,subgerentes, Rs1, administración de tienda)",
            status:0
        }
        ,
        {
            id: 2,
            content: "Agendar espacio de 1 hora para brindar feedback a colaboradores mandos medios ( Jefe de sección,subgerentes, Rs1, administración de tienda)",
            status:0
        }
        ,
        {
            id: 2,
            content: "Agendar espacio de 1 hora para brindar feedback a colaboradores mandos medios ( Jefe de sección,subgerentes, Rs1, administración de tienda)",
            status:1
        }
    ],
    "c4_sub_dimension": "Habilidad Gerencial",
    "c1_id": "XqmRTLX3x2oFL3xZ",
    "c10_meas_indicator": "Pulso Abril",
    "c15_default": "",
    "c3_dimension": "Credibilidad",
    "c8_responsables": [
        'Jorge', 'Juan'
    ],
    "c14_archivo": "empty",
    "c2_dni": "96478932",
    "c12_date_end": "18/4/2024",
    "c13_status": 2,
    "c11_date_start": "13/4/2024",
    "c6_title": "Plan de contingencia para la satisfacción del personal",
    "c7_description": "Una breve descripción de este plan a tomar en cuenta",
    "c5_enunciate": "Los colaboradores que ingresan a la organización encajan bien con nuestra cultura"
}


document.addEventListener("DOMContentLoaded", () => {


    renderFullViewPlan(objt)
    // carga tippy
  


})

const finishTash = document.querySelector(".button_box_task_FV button")
const sectionRender = document.getElementById("section_FullView")
// funciones extra

// finishTash.addEventListener("click", successTask)


function successTask(e) {
    let boton = e.target
    let padre = e.target.parentNode;
    boton.classList.add("animate__bounceOut");
    boton.addEventListener('animationend', () => {
        boton.style.display = 'none'
        padre.insertAdjacentHTML('beforeend', appendChek());

    });
}

// function append 

function appendChek(){
    // const newEle = document.createElement("div")
    // newEle.className = 'box__finish'
    // newEle.innerHTML = `<i class="finish_check bi bi-check-lg"> <i/>`
    // return newEle

    return `
    <div class="box__finish">
            
            <i class="finish_check bi bi-check-lg"></i>
    
            </div>
    `
}

// render function

const statusObj = {
    1 :'Completado',
    2:'En progreso',
    3:'Pendiente'
}


function renderFullViewPlan(data) {
    const { c3_dimension, c4_sub_dimension, c5_enunciate, c6_title, c7_description, c8_responsables, c9_tasks, c10_meas_indicator, c12_date_end, c13_status } = data
    const ChildElement = document.createElement("div")
    ChildElement.className = 'box-FullView';
    ChildElement.innerHTML = `
    <!-- bloque de tiempo liímite -->
    <div class="time_FV">
        ${checkDate(c12_date_end)}
    </div>
    <div class="indicator_FV">
        <span>
            ${c10_meas_indicator}
        </span>
    </div>
    <div class="title_FV">
        <h2>${c6_title}</h2>
        <div>
            ${statusColor(c13_status)}
        </div>

    </div>

    <div class="box_Dimention_FV">

        <span class="dimention_FV">
            ${c3_dimension}
        </span>

        <span class="subDimention_FV">
        ${c4_sub_dimension}

        </span>


    </div>

    <!--enunciado -->
    <div class="enunciate_FV">
        <h3 class="gen_subtitle">Enunciado</h3>
        <p>${c5_enunciate}</p>
    </div>

    <div class="description_FV">
        <h3 class="gen_subtitle">Descripción</h3>
        <p>${c7_description}
        </p>
    </div>


    <div class="responsables_FV">
        <h3 class="gen_subtitle">Responsables</h3>
       ${ResponsableBlocks(c8_responsables)}

    </div>

    <!-- Tasks -->
    <div class="tasks_FV">
        <h3 class="gen_subtitle">Tareas</h3>
        <!-- tarea -->

       ${TaskBlocks(c9_tasks)}

    </div>
    
    `

    // event click

    ChildElement.querySelectorAll('.button_box_task_FV button').forEach(item => 
    
        item.addEventListener('click', successTask)
    )



    sectionRender.appendChild(ChildElement)

    tippy('#status_pulse_FV', {
        content: statusObj[c13_status],
    });

}


function statusColor(status) {

    var renderStatus = '<div id="status_pulse_FV" class="circle pulse orange"></div>'
    // return `
    // <div id="status_pulse_FV" class="circle pulse orange"></div>
    // `
    if (status === 1) {
        renderStatus = `
            <div id="status_pulse_FV" class="circle pulse orange" style="background-color:green;"></div>
            `
    }

    if (status === 3) {
        renderStatus = `
            <div id="status_pulse_FV" class="circle pulse orange" style="background-color:red;"></div>
            `
    }

   

    return renderStatus
    

}

function ResponsableBlocks(responsables) {

    return responsables.map(item => `<span class="resp_block">${item}</span>`).join(" ")
}


function TaskBlocks(task) {

    return task.map(item =>
    
        ` <div id="${item.id}" class="task_FV">
        <p>
           ${item.content}
        </p>
    
        <div id="lolaso" class="button_box_task_FV">
            ${item.status ? appendChek(): `<button class="animate__animated">Terminar</button>`}
    
        </div>
    </div>`).join(" ")

}

function checkDate(endDate) {

    const timeZone = 'America/Lima';

// // Fechas de inicio y fin
// const startDate = '14/04/2024';
// const endDate = '15/04/2024';

// // Crear objetos Moment para las fechas
// const start = moment(startDate, 'DD/MM/YYYY').tz(timeZone);
const end = moment(endDate, 'DD/MM/YYYY');

const today = moment()

// Opciones para personalizar el método calendar()
const calendarOptions = {
    sameDay: '[Plan disponible hasta hoy]',
    nextDay: '[Plan disponible hasta mañana]',
    nextWeek: '[Plan disponible hasta el ] dddd DD [de] MMMM',
    lastDay: '[El plan se encuentra atrasado]',
    sameElse: '[Plan disponible hasta el] DD [de] MMMM'
  };
  
  // Verifica si la promoción ya terminó
  
    const calendarDescription = end.calendar(today, calendarOptions);
    console.log(calendarDescription);

    return calendarDescription;
  

    
}


// console.log(moment().subtract(3, 'days').calendar())



