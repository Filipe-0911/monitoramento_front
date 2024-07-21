import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import DataService from "../../../services/DataService";
import PlanejadorService from "../../../services/PlanejadorService";
import SelectDeAssuntos from "../../SelectDeAssuntos";

const InputEventos = ({ onChange, dadosFormulario, dataService }) => {
    return (
        <>
            <label>Data hora de Início</label>
            <CampoForm
                type="datetime-local"
                onChange={onChange}
                name="start"
                defaultValue={dadosFormulario.start ? dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(dadosFormulario.start) : ''}
            />

            <label>Data hora de Término</label>
            <CampoForm
                type="datetime-local"
                onChange={onChange}
                name="end"
                defaultValue={dadosFormulario.end ? dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(dadosFormulario.end) : ''}
            />
        </>
    );
}

export default function FormularioEventos({ formDefaultValue, setFormEventos, closeModal, setListaDePlanejadores, listaDeAssuntosDoUsuario, listaDePlanejadores }) {
    const dataService = new DataService();
    const planejadorService = new PlanejadorService();

    const handleChanger = (e) => {
        setFormEventos(prevForm => {
            if (e.target.name === "end" || e.target.name === "start") {
                return {
                    ...prevForm,
                    [e.target.name]: e.target.value  // Manter o valor como string
                };
            }
    
            if (e.target.name === "idAssunto") {
                return {
                    ...prevForm,
                    [e.target.name]: e.target.value
                };
            }
    
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            };
        });
    };
    

    const defineSeAlteraOuAdiciona = (e) => {
        return formDefaultValue.id === null ? adicionaEvento(e) : alteraEvento(e);
    }

    const adicionaEvento = (e) => {
        e.preventDefault();
        const { idAssunto, start, end} = formDefaultValue;
        let dadosParaEnvio = {
            idAssunto: idAssunto,
            dadosEvento: {
                dataInicio: dataService.transformaDataEmStringParaEnviarApi(start),
                dataTermino: dataService.transformaDataEmStringParaEnviarApi(end)
            }
        }
        try {
            planejadorService.adicionarEventos(dadosParaEnvio).then(response => {
                const { id, dataInicio, dataTermino, nomeAssunto } = response;
                let novoPlanejador = { 
                    start: dataService.transformaStringDeInputDateTimeLocalEmData(dataInicio), 
                    end: dataService.transformaStringDeInputDateTimeLocalEmData(dataTermino), 
                    title: nomeAssunto, 
                    id: id 
                };

                setListaDePlanejadores(prevListaPlanejadores => ([
                    ...prevListaPlanejadores,
                    novoPlanejador
                ]));

            }).catch(erro => alert(erro.message))
        } catch (error) {
            alert(error.message)
        }
        limpaFormEventos();
        closeModal();
    }

    const alteraEvento = (e) => {
        e.preventDefault();
        try {
            const { start, end, id } = formDefaultValue;
            planejadorService.alterarEventos({ dadosEvento: { dataInicio: start, dataTermino: end }, idEvento: id })
                .then((response) => {
                    const { id, dataInicio, dataTermino, nomeAssunto } = response;
                    setListaDePlanejadores(prevState => prevState.map(planejador => planejador.id === id ? { 
                        start: new Date(dataInicio), 
                        end: new Date(dataTermino), 
                        title: nomeAssunto 
                    } : planejador));
                    console.log(response)
                })
                .catch(err => console.log(err.message));
            } catch (error) {
                alert(error.data);
            } finally {
                limpaFormEventos();
                closeModal();
            }
        
    }

    const limpaFormEventos = () => {
        setFormEventos({
            id: null,
            idProva: null,
            idMateria: null,
            start: '',
            end: '',
            title: '',
        });
    }
    return (
        <>
            <FormEstilizado onSubmit={e => e.preventDefault()}>
                <h3>
                    {formDefaultValue.id !== null ? "Editar Evento" : "Adicionar evento"}
                </h3>
                <h4>{formDefaultValue.title}</h4>
                {
                    formDefaultValue.id === null
                        ?
                        <>
                            <label>Nome do Assunto</label>
                            <SelectDeAssuntos options={listaDeAssuntosDoUsuario} value={formDefaultValue} onChange={handleChanger} />
                        </>
                        : null
                }
                <InputEventos
                    onChange={handleChanger}
                    dadosFormulario={formDefaultValue}
                    dataService={dataService}
                />
                <BotaoEstilizado
                    disabled={false}
                    onClick={(e) => defineSeAlteraOuAdiciona(e)}
                >
                    {formDefaultValue.id !== null ? "Editar" : "Adicionar"}
                </BotaoEstilizado>
            </FormEstilizado>
        </>
    );
}
