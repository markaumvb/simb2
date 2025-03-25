# server

## Novo servidor para o simb, com mudanças de banco de dados

## react -> https://www.youtube.com/watch?v=NlXfg5Pxxh8

## npm run docs >> documentação completa!!

-- Trigger para controle de saldo almoxarifado
CREATE OR REPLACE FUNCTION controle_saldo_almoxarifado()
RETURNS TRIGGER AS $$
BEGIN
-- Desabilitar o item em caso de saldo <= 0
IF NEW.saldo <= 0 THEN
NEW.status = 'ESGOTADO';
ELSIF NEW.saldo_min IS NOT NULL AND NEW.saldo <= NEW.saldo_min THEN
NEW.status = 'PENDENTE';
ELSE
NEW.status = 'DISPONIVEL';
END IF;

RETURN NEW;
END;

$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_controle_saldo_almoxarifado
BEFORE UPDATE ON "Almoxarifado"
FOR EACH ROW
EXECUTE FUNCTION controle_saldo_almoxarifado();
$$

-- Trigger para lançamento automático de valores em acerto
CREATE OR REPLACE FUNCTION lancamento_automatico_acerto()
RETURNS TRIGGER AS $$
BEGIN
-- Se o status mudou para CONCLUIDO, gera lançamentos automáticos
IF NEW.status = 'CONCLUIDO' AND OLD.status = 'PENDENTE' THEN
-- Inserir registros na tabela Itens_acerto baseados em alguma lógica
-- Exemplo: registrar saldo final da movimentação
INSERT INTO "Itens_acerto" (
descricao,
valor,
data,
id_acerto_fechamento,
debito_credito,
dt_inclusao,
dt_alteracao,
tenant_id
)
VALUES (
'Fechamento automático',
(SELECT SUM(valor_cobrado) FROM "Cobranca" WHERE id_movimentacao = NEW.id_movimentacao),
CURRENT_DATE,
NEW.id,
'crédito',
CURRENT_TIMESTAMP,
CURRENT_TIMESTAMP,
NEW.tenant_id
);
END IF;

RETURN NEW;
END;

$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_lancamento_automatico_acerto
AFTER UPDATE ON "Acerto_fechamento"
FOR EACH ROW
EXECUTE FUNCTION lancamento_automatico_acerto();
$$
