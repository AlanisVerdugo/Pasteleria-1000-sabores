// componente reutilizable: un producto dentro de un pedido (foto + nombre + detalle)
// se usa en la página de Pedidos (5 veces)
function ProductoPedido({ imagen, titulo, detalle }) {

    return (
        <>
            <div className="ped-item">
                <img src={imagen} alt={titulo} className="ped-item-img"/>
                <div>
                    <h3 className="ped-item-titulo">{titulo}</h3>
                    <p className="ped-item-detalle mb-0">{detalle}</p>
                </div>
            </div>
        </>
    )
}

export default ProductoPedido;
