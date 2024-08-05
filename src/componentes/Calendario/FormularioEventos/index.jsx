import { FormEstilizado } from "../../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../../componentes/CampoForm";
import BotaoEstilizado from "../../../componentes/Botao";
import DataService from "../../../services/DataService";
import PlanejadorService from "../../../services/PlanejadorService";
import SelectDeAssuntos from "../../SelectDeAssuntos";
import { FieldsetEstilizado } from "../../../componentes/Fieldset";

const InputEventos = ({ onChange, dadosFormulario, dataService }) => {
    return (
        <>
            <FieldsetEstilizado>
                <label>Data hora de Início</label>
                <CampoForm
                    type="datetime-local"
                    onChange={onChange}
                    name="start"
                    defaultValue={dadosFormulario.start ? dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(dadosFormulario.start) : ''}
                />
            </FieldsetEstilizado>
            <FieldsetEstilizado>
                <label>Data hora de Término</label>
                <CampoForm
                    type="datetime-local"
                    onChange={onChange}
                    name="end"
                    defaultValue={dadosFormulario.end ? dataService.transformaDataEmStringParaInserirEmInputDateTimeLocal(dadosFormulario.end) : ''}
                />
            </FieldsetEstilizado>
        </>
    );
}

export default function FormularioEventos({ formDefaultValue, setFormEventos, closeModal, setListaDePlanejadores, listaDeAssuntosDoUsuario, setAlertError, setAlertSuccess }) {
    const dataService = new DataService();
    const planejadorService = new PlanejadorService();

    const handleChanger = (e) => {
        setFormEventos(prevForm => {
            if (e.target.name === "revisao") {
                return {
                    ...prevForm,
                    revisao: e.target.checked
                };
            }
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


    const defineSeAlteraOuAdiciona = async (e) => {
        return formDefaultValue.id === null ? adicionaEvento(e) : alteraEvento(e);
    }

    const adicionaEvento = async (e) => {
        e.preventDefault();
        const { idAssunto, start, end, revisao } = formDefaultValue;
        let dadosParaEnvio = {
            idAssunto: idAssunto,
            dadosEvento: {
                dataInicio: dataService.transformaDataEmStringParaEnviarApi(start),
                dataTermino: dataService.transformaDataEmStringParaEnviarApi(end),
                revisao: revisao
            }
        }
        try {
            const response = await planejadorService.adicionarEventos(dadosParaEnvio);
            inserePlanejadorNaListaAposResponse(response);
            setAlertSuccess(`Planejador de estudo criado com sucesso na data: ${dataService.transformarDataEmString(dataInicio)}`)

        } catch (error) {
            setAlertError(error.response?.data)
        } finally {
            limpaFormEventos();
            closeModal();
        }
    }

    function inserePlanejadorNaListaAposResponse(response) {
        if (Array.isArray(response)) {
            response.forEach(planejador => {
                const { id, dataInicio, dataTermino, nomeAssunto, cor } = planejador;
                let novoPlanejador = {
                    start: dataService.transformaStringDeInputDateTimeLocalEmData(dataInicio),
                    end: dataService.transformaStringDeInputDateTimeLocalEmData(dataTermino),
                    title: nomeAssunto,
                    id: id,
                    color: cor
                };

                setListaDePlanejadores(prevListaPlanejadores => ([
                    ...prevListaPlanejadores,
                    novoPlanejador
                ]));
            })

        } else {
            const { id, dataInicio, dataTermino, nomeAssunto, cor } = response;
            let novoPlanejador = {
                start: dataService.transformaStringDeInputDateTimeLocalEmData(dataInicio),
                end: dataService.transformaStringDeInputDateTimeLocalEmData(dataTermino),
                title: nomeAssunto,
                id: id,
                color: cor
            };
            setListaDePlanejadores(prevListaPlanejadores => ([
                ...prevListaPlanejadores,
                novoPlanejador
            ]));

        }
    }

    const alteraEvento = async (e) => {
        e.preventDefault();
        try {
            const { start, end, id } = formDefaultValue;
            const response = await planejadorService.alterarEventos({ dadosEvento: { dataInicio: start, dataTermino: end }, idEvento: id })
            const { dataInicio, dataTermino, nomeAssunto } = response;

            setListaDePlanejadores(prevState => prevState.map(planejador => planejador.id === response.id ? {
                start: new Date(dataInicio),
                end: new Date(dataTermino),
                title: nomeAssunto
            } : planejador));

            setAlertSuccess(`Planejador de estudo alterado com sucesso na data: ${dataService.transformarDataEmString(dataInicio)}`)
        } catch (error) {
            setAlertError(error.response?.data);
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
                        <FieldsetEstilizado>
                            <label>Nome do Assunto</label>
                            <SelectDeAssuntos
                                options={listaDeAssuntosDoUsuario}
                                value={formDefaultValue}
                                onChange={handleChanger}
                            />
                        </FieldsetEstilizado>
                        : null
                }
                <InputEventos
                    onChange={handleChanger}
                    dadosFormulario={formDefaultValue}
                    dataService={dataService}
                />
                <FieldsetEstilizado>
                    <label>
                        Inserir revisão
                    </label>
                    <CampoForm
                        type="checkbox"
                        name="revisao"
                        onChange={handleChanger}
                        defaultValue={formDefaultValue}
                    />
                </FieldsetEstilizado>
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
