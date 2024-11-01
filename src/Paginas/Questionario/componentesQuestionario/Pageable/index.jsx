import { useEffect, useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { MdLastPage, MdFirstPage } from "react-icons/md";

export default function Pageable({ dadosQuestao, buscaQuestaoEspecifica, numQuestao }) {
    const totalPages = dadosQuestao.page.totalElements;
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        if (currentPage <= parseInt(dadosQuestao.page.totalElements / 3)) {
            setCurrentPage(currentPage + 1);
        }
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

    }

    const pagesToDisplay = Array.from({ length: totalPages }, (_, index) => index + 1)
    .slice((currentPage - 1) * 3, currentPage * 3);

    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", gap: "0.5em" }}>
            <div>
                <MdFirstPage
                    size={30}
                    onClick={() => setCurrentPage(1)}
                    style={{
                        cursor: 'pointer',
                    }}
                />
                <GrFormPrevious
                    size={30}
                    onClick={goToPreviousPage}
                    style={{
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div style={{ display: "flex", gap: "1em", minWidth: "100px", justifyContent: "center" }}>
                {pagesToDisplay.map((page) => (
                    <p
                        key={page}
                        onClick={() => buscaQuestaoEspecifica(page - 1)}
                        style={{
                            cursor: 'pointer',
                        }}>

                        {page}
                    </p>
                ))}
                {
                    pagesToDisplay.length < 2 &&
                    <>
                        <p>
                            ...
                        </p>
                        <p>
                            ...
                        </p>
                    </>
                }
            </div>
            <div>
                <GrFormNext
                    size={30}
                    onClick={goToNextPage}
                    style={{
                        cursor: 'pointer',
                    }}
                />
                <MdLastPage
                    size={30}
                    onClick={() => setCurrentPage(Math.ceil(dadosQuestao.page.totalElements / 3))}
                    style={{
                        cursor: 'pointer',
                    }}
                />
            </div>
        </div>
    )
}