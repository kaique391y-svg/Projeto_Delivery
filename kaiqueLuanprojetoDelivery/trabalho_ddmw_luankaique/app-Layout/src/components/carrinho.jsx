import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const cores = {
  primaria: '#3D5AFE',
  sucesso: '#2EC478',
  escura: '#202A44',
  secundaria: '#828282',
  fundoClaro: '#F2F4F7',
  branco: '#FFFFFF',
  linhaSeparadora: '#E0E0E0',
};

export default function Carrinho({
  carrinho = [],
  onAlterarQtd,
  subtotal = 0,
  taxaEntrega = 6.00,
  totalGeral = 0,
  onContinuar,
  onVoltar
}) {
  const carrinhoVazio = carrinho.length === 0;

  return (
    <View style={styles.container}>
      {/* Topo / Header */}
      <TouchableOpacity style={styles.header} onPress={onVoltar}>
        <Text style={styles.headerTexto}>← Meu Carrinho</Text>
      </TouchableOpacity>

      {/* Lista de Itens */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {carrinhoVazio ? (
          <Text style={styles.carrinhoVazioTexto}>Seu carrinho está vazio.</Text>
        ) : (
          carrinho.map((item) => (
            <View key={item.id} style={styles.itemLinha}>
              {/* Esquerda: Nome e Preço Unitário */}
              <View style={styles.infoEsquerda}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.precoUnitario}>
                  R$ {item.preco ? item.preco.toFixed(2).replace('.', ',') : '0,00'}
                </Text>
              </View>

              {/* Direita: Controles + Subtotal alinhados */}
              <View style={styles.infoDireita}>
                <View style={styles.controlesQtd}>
                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => onAlterarQtd && onAlterarQtd(item.id, -1)}
                  >
                    <Text style={styles.textoBotaoQtd}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.numeroQtd}>{item.quantidade}</Text>

                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => onAlterarQtd && onAlterarQtd(item.id, 1)}
                  >
                    <Text style={styles.textoBotaoQtd}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Subtotal do item */}
                <Text style={styles.subtotalItem}>
                  {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Card de Resumo Financeiro */}
      <View style={styles.cardResumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.rotuloResumo}>Subtotal</Text>
          <Text style={styles.valorResumo}>
            R$ {subtotal.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <View style={styles.linhaResumo}>
          <Text style={styles.rotuloResumo}>Entrega</Text>
          <Text style={styles.valorResumo}>
            R$ {subtotal > 0 ? taxaEntrega.toFixed(2).replace('.', ',') : '0,00'}
          </Text>
        </View>

        <View style={styles.linhaResumo}>
          <Text style={styles.rotuloTotal}>TOTAL</Text>
          <Text style={styles.valorTotal}>
            R$ {totalGeral.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      {/* Botão Continuar */}
      <TouchableOpacity
        style={[styles.botaoContinuar, carrinhoVazio && styles.botaoDesabilitado]}
        disabled={carrinhoVazio}
        onPress={onContinuar}
      >
        <Text style={styles.textoBotaoContinuar}>Continuar</Text>
      </TouchableOpacity>

      {/* Identificador da Tela */}
      <Text style={styles.rodapeIdentificador}>T2 · Carrinho</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    backgroundColor: cores.primaria,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  headerTexto: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
  },
  carrinhoVazioTexto: {
    textAlign: 'center',
    marginTop: 40,
    color: cores.secundaria,
    fontSize: 16,
  },
  itemLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.linhaSeparadora,
  },
  infoEsquerda: {
    justifyContent: 'center',
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },
  precoUnitario: {
    fontSize: 14,
    color: cores.secundaria,
    marginTop: 4,
  },
  infoDireita: {
    alignItems: 'flex-end',
  },
  controlesQtd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  botaoQtd: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cores.branco,
  },
  textoBotaoQtd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.primaria,
    lineHeight: 18,
  },
  numeroQtd: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '600',
    color: cores.escura,
  },
  subtotalItem: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.escura,
  },
  cardResumo: {
    backgroundColor: cores.fundoClaro,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rotuloResumo: {
    fontSize: 14,
    color: cores.secundaria,
  },
  valorResumo: {
    fontSize: 14,
    color: cores.escura,
    fontWeight: '500',
  },
  rotuloTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.escura,
  },
  valorTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.sucesso,
  },
  botaoContinuar: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  botaoDesabilitado: {
    backgroundColor: '#A0A0A0',
  },
  textoBotaoContinuar: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rodapeIdentificador: {
    textAlign: 'center',
    color: cores.primaria,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
});