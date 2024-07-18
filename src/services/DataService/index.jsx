export default class DataService {
    transformarDataEmString(data) {
        let dataConvertida = new Date(data).toLocaleString().replace(',', '').substring(0, 16);
        return dataConvertida;
    }

    transformaDataEmStringParaInserirEmInputDateTimeLocal(data) {
        return new Date(data).toISOString().substring(0, 16);
    }
}