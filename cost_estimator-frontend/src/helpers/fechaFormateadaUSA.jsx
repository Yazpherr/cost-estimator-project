export default function fechaFormateadaUSA(fecha){
    const isoDate = new Date(fecha).toISOString();
    const formattedDate = isoDate.substring(0, 10).split('-').join('-');
    return formattedDate;
  }
