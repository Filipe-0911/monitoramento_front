export default class DataService {
    transformarDataEmString(data) {
        let dataConvertida = new Date(data).toLocaleString().replace(',', '').substring(0, 16);
        return dataConvertida;
    }
    transformaDataEmStringParaEnviarApi(data) {
        if (!data) return '';
        const dataLocal = new Date(data);
        // Extrai ano, mês, dia, hora e minuto
        const ano = dataLocal.getFullYear();
        const mes = String(dataLocal.getMonth() + 1).padStart(2, '0');  // Meses são indexados a partir de 0
        const dia = String(dataLocal.getDate()).padStart(2, '0');
        const hora = String(dataLocal.getHours()).padStart(2, '0');
        const minuto = String(dataLocal.getMinutes()).padStart(2, '0');
    
        // Formata no formato 'YYYY-MM-DDTHH:MM'
        return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
    }
    

    transformaDataEmStringParaInserirEmInputDateTimeLocal(data) {
        if (!data) return '';
        const dataLocal = new Date(data);
        const offset = dataLocal.getTimezoneOffset();
        const dataCorrigida = new Date(dataLocal.getTime() - (offset * 60 * 1000));
        return dataCorrigida.toISOString().substring(0, 16);
    }

    transformaStringDeInputDateTimeLocalEmData(dataString) {
        if (!dataString) return null;
        return new Date(dataString);
    }
}
