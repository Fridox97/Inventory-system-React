import React from "react";
import ListaDePrestamos from "../../components/listadeprestamos";
import '../../stylogeneral.css'

export default function Prestamos() {
    return (
        <>

            <div className="margen_header">
                <ListaDePrestamos />
            </div>

        </>
    )
}