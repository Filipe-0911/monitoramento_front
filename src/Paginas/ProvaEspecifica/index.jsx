import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProvasService from "../../services/Provas";
import Cabecalho from "../../componentes/Cabecalho";
import MainEstilizada from "../../componentes/Main";
import DataService from "../../services/DataService";
import PaginaEspecifaNotFound from "../ProvaEspecificaNotFound";
import BotaoEstilizado from "../../componentes/Botao";
import { SectionProvasEstilizada } from "../Provas";
import styled from "styled-components";
import ModalComponent from "../../componentes/Modal";
import { FormEstilizado } from "../../componentes/ContainerLoginEstilizado";
import CampoForm from "../../componentes/CampoForm";
import { BotaorCard } from "../../componentes/ComponentesHome";
import { MdCancel, MdOutlineAddToPhotos } from "react-icons/md";
import MateriasService from "../../services/MateriasService";
import Accordion from "../../componentes/Accordion";

export const DivBotoesCrudMateria = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;

    @media (max-width: 562px) {
        justify-content: space-between
    }
`;

const DivEstilizadaProvaEspecífica = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 1em 0;

    span {
        width: 25%;
    }

    @media (max-width: 562px) {
        span {
            width: 100%;
        }
    }
`

const InputAssunto = ({ input, index, onChange }) => {
    return (
        <>
            <label>Nome Assunto</label>
            <CampoForm onChange={onChange} name={input.name} placeholder={input.placeholder} />
            <label>Quantidade de PDFs</label>
            <CampoForm onChange={onChange} type="number" name={`quantidade_input_${index}`} placeholder="Digite a quantidade" />
        </>
    );
}

const ProvaEspecifica = () => {
    const dataService = new DataService();
    const provaService = new ProvasService();
    const materiasService = new MateriasService();
    const parametros = useParams();
    const [prova, setProva] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState({ idProva: 0, nome: "" });
    const [quantidadeDeInputs, setQuantidadeDeInputs] = useState([]);

    const excluirMateria = (idMateria) => {
        materiasService.deletaMateria(prova.id, idMateria).then(() => {
            setProva({
                ...prova,
                listaDeMaterias: prova.listaDeMaterias.filter(materia => materia.id !== idMateria)
            })
        }).catch(erro => console.log(erro));
    }

    useEffect(() => {
        provaService.buscaProvaPorId(+parametros.id).then(res => {
            if (res.request && res.request.status === 404) {
                setIsLoading(false);
                setProva(null);
                return;
            } else {
                setIsLoading(false);
                setProva(res);
                setForm({ idProva: res.id, nome: "" });
            }

        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });

    }, [parametros.id]);

    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }
    const handleChanger = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (prova === null) {
        return <PaginaEspecifaNotFound erro="Prova não encontrada" />;
    }

    const adicionaMateria = () => {
        materiasService.adicionaMateria(form).then(res => {
            const { nome, id, listaDeAssuntos } = res;
            let novaMateria = { nome: nome, id: id, listaDeAssuntos: listaDeAssuntos };

            setProva({ ...prova, listaDeMaterias: [...prova.listaDeMaterias, novaMateria] });
        }).catch(err => console.error(err));

        console.log(form)
        setQuantidadeDeInputs([])
    }

    const adicionaInputDeAssunto = () => {
        let name = `nome_assunto_${quantidadeDeInputs.length}`;
        console.log(name)
        setQuantidadeDeInputs([...quantidadeDeInputs, { name: name, placeholder: "Digite o nome do assunto" }]);
    }

    return (
        <>
            <Cabecalho />
            <MainEstilizada>
                <SectionProvasEstilizada>
                    <h1>Prova: {prova.titulo}</h1>
                    <p>Data da prova: {dataService.transformarDataEmString(prova.data)}</p>
                    <DivEstilizadaProvaEspecífica>
                        <span>
                            <BotaoEstilizado onClick={openModal}>
                                Adicionar Materias
                            </BotaoEstilizado>
                        </span>
                    </DivEstilizadaProvaEspecífica>
                    {prova.listaDeMaterias.map(materia => {
                        console.log(materia);
                        return (
                            <Accordion key={materia.id} titulo={`Matéria: ${materia.nome}`}>
                                <ul>
                                    {materia.listaDeAssuntos.map(assunto => {
                                        return (
                                            <li key={assunto.id}>
                                                <section>
                                                    <h5>
                                                        {assunto.nome}
                                                    </h5>
                                                    <p>
                                                        Quantidade de pdfs: {assunto.quantidadePdf}
                                                    </p>
                                                    <p>
                                                        Quantidade de questões feitas: {assunto.idQuestoes.length}
                                                    </p>
                                                </section>
                                                <section>
                                                    <BotaorCard $type="excluir">
                                                        Excluir Assunto
                                                    </BotaorCard>
                                                    <BotaorCard $type="editar">
                                                        Editar Assunto
                                                    </BotaorCard>
                                                </section>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <DivBotoesCrudMateria>
                                    <BotaorCard $type="adicionar">
                                        Adicionar Assunto
                                    </BotaorCard>
                                    <BotaorCard onClick={() => excluirMateria(materia.id)} $type="excluir">
                                        Excluir Materia
                                    </BotaorCard>
                                    <BotaorCard $type="editar">
                                        Editar Materia
                                    </BotaorCard>
                                </DivBotoesCrudMateria>
                            </Accordion>
                        );
                    })}
                </SectionProvasEstilizada>
                <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <BotaorCard $type="excluir" onClick={closeModal}>
                            <MdCancel />
                        </BotaorCard>
                    </div>
                    <FormEstilizado onSubmit={e => e.preventDefault()}>
                        <h3>Adicionar Materia</h3>
                        <label>Nome da matéria</label>
                        <CampoForm
                            name="nome"
                            onChange={handleChanger}
                            placeholder="Nome da matéria"
                        />
                        {quantidadeDeInputs.length > 0 && <h3>Assuntos</h3>}
                        {
                            quantidadeDeInputs.map((input, index) => {
                                return (
                                    <InputAssunto input={input} key={index} index={index} onChange={handleChanger} />
                                )
                            })
                        }
                        <BotaoEstilizado
                            onClick={adicionaMateria}>
                            Adicionar
                        </BotaoEstilizado>
                    </FormEstilizado>
                    <section style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 1em 1em 0' }}>
                        <BotaorCard
                            name="adicionar"
                            $type="adicionar"
                            onClick={e => adicionaInputDeAssunto()}
                        >
                            <MdOutlineAddToPhotos
                                id="adicionar"
                                size={15}
                                style={{ cursor: 'pointer' }}
                            />
                            Adicionar Assuntos
                        </BotaorCard>
                    </section>
                </ModalComponent>
            </MainEstilizada>
        </>
    );
}
export default ProvaEspecifica;
