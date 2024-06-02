export default function fechaFormateada(fecha){
    const isoDate = new Date(fecha).toISOString();
    const formattedDate = isoDate.substring(0, 10).split('-').reverse().join('-');
    return formattedDate;
  }
