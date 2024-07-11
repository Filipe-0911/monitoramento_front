export default class DataService {
    transformarDataEmString(data) {
        return new Date(data).toLocaleString().replace(',', '').substring(0, 16);
    }
}