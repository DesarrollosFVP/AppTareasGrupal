const { leerJSON, escribirJSON } = require("../data");
const Tarea = require("./Tarea");

module.exports = {
  tareas: leerJSON(),
  listar: function (tareas = this.tareas) {
    tareas.forEach(({ clase, titulo, estado }) => {
      console.log(`CLASE: ${clase}: ${titulo} --> ${estado}`);
    });
  },
  agregar: require('./agregar'),
  filtrar: function (estado) {
    const tareasFiltradas = this.tareas.filter(
      (tarea) => tarea.estado === estado
    );
    if (!tareasFiltradas.length) {
      return console.log(`INFO: No hay tareas con el estado: '${estado}'`);
    }
    this.listar(tareasFiltradas);
  },
  editar: function (clase, estado) {
    const tareas = this.tareas;
    const tarea = tareas.find(tarea => tarea.clase === clase);
    if(!tarea){
        return console.log(`ERROR: La clase ${clase} no se encuentra`)
    }
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.clase === clase) {
        tarea.estado = estado.toLowerCase();
      }
      return tarea;
    });

    escribirJSON(tareasActualizadas);

    return `El estado de la clase ${tarea.titulo} ahora es ${estado}.`;
  },
};
