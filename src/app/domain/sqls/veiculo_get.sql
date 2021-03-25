SELECT
    CodigoMVA VeiculoId, 
    Veiculos.Placa, 
    Veiculos.Descricao AS  Modelo, 
    Veiculos.Grupo As Grupo, 
    Veiculos.OdometroAtual, 
    Veiculos.LocalOndeSeEncontra AS LocalOndeSeEncontra,
    Veiculos.Status,
    Veiculos.DescricaoStatus AS  DescricaoStatus,
    Veiculos.DescricaoUnidade,
    Veiculos.Equipamentos,    
    Veiculos.CodigoModelo ModeloId,                                    
    TotalPaginas	= CAST((COUNT(*) OVER ()) AS FLOAT)/CAST(@RowsCount AS FLOAT)         
FROM (
        SELECT   
            Veiculos.CodigoMVA, 
            Veiculos.Placa,
            Veiculos.Status, 
            CASE Veiculos.Status 
                WHEN 'D' THEN 'Disponível' 
                WHEN 'A' THEN 'Alugado' 
                WHEN 'R' THEN 'Roubado'
                WHEN 'T' THEN 'Sub-locado Devolvido' 
                WHEN 'E' THEN 'em Manutenção' 
                WHEN 'V' THEN 'Vendido'
                WHEN 'P' THEN 'à Venda' 
                WHEN 'X' THEN 'Em preparação' 
                WHEN 'O' THEN 'Bloqueado'
                WHEN 'S' THEN 'Preparação Venda' 
                WHEN 'N' THEN 'Sinistro' 
                WHEN 'F' THEN 'Traslado'
                WHEN 'U' THEN 'Uso Interno' 
            END AS DescricaoStatus,
            VeiculosModelos.Descricao, 
            Veiculos.CodigoModelo,
            VeiculosGrupos.Descricao AS Grupo,
            Veiculos.OdometroAtual,
            Veiculos.LocalOndeSeEncontra,
            EmpresaUnidades.DescricaoUnidade,
            Veiculos.CodigoEmpresa,
            Veiculos.CodigoUnidade,
            CASE dbo.fn_Equipamentos(Veiculos.CodigoMVA) WHEN '/' THEN '' ELSE dbo.fn_Equipamentos(Veiculos.CodigoMVA) END AS Equipamentos
        FROM Veiculos
        LEFT JOIN VeiculosModelos ON Veiculos.CodigoModelo = VeiculosModelos.CodigoModelo
        LEFT JOIN VeiculosEquipamentos ON Veiculos.CodigoMVA = VeiculosEquipamentos.CodigoMVA
        LEFT JOIN EmpresaUnidades ON Veiculos.CodigoEmpresa = EmpresaUnidades.CodigoEmpresa AND Veiculos.CodigoUnidade = EmpresaUnidades.CodigoUnidade
        LEFT JOIN VeiculosGrupos ON VeiculosModelos.CodigoGrupoVeiculo = VeiculosGrupos.CodigoGrupo
        LEFT JOIN VeiculosMarcas ON VeiculosModelos.CodigoMarca = VeiculosMarcas.CodigoMarca                                       
        GROUP BY Veiculos.CodigoMVA,
                Veiculos.Placa,
                Veiculos.Status,
                VeiculosModelos.Descricao,
                Veiculos.CodigoModelo,
                VeiculosGrupos.Descricao,
                Veiculos.LocalOndeSeEncontra,
                Veiculos.EmPosseDe, 
                Veiculos.OdometroAtual,
                EmpresaUnidades.DescricaoUnidade,
                Veiculos.CodigoEmpresa,
                Veiculos.CodigoUnidade
) Veiculos
ORDER BY Veiculos.LocalOndeSeEncontra, Veiculos.Placa, Veiculos.Descricao
OFFSET (@Page - 1) * @RowsCount ROWS
FETCH NEXT @RowsCount ROWS ONLY;