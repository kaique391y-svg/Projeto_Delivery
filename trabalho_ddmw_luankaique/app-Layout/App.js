import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

// Importa os ficheiros criados
import Cardapio from './src/components/cardapio'; // ajusta o caminho se necessário
import Carrinho from './src/components/carrinho';
import Checkout from './src/components/checkout';

const TAXA_ENTREGA = 6.00;

export default function App() {
  const [ecraAtual, setEcraAtual] = useState('T1'); // 'T1' (Cardapio), 'T2' (Carrinho), 'T3' (Checkout)
  const [carrinho, setCarrinho] = useState([]);

  // 1. Adicionar item ao carrinho
  const handleAdicionarItem = (produto) => {
    setCarrinho((itensAnteriores) => {
      const itemExistente = itensAnteriores.find((item) => item.id === produto.id);
      if (itemExistente) {
        return itensAnteriores.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...itensAnteriores, { ...produto, quantidade: 1 }];
    });
  };

  // 2. Alterar quantidade (+1 ou -1)
  const handleAlterarQtd = (id, delta) => {
    setCarrinho((itensAnteriores) =>
      itensAnteriores
        .map((item) => {
          if (item.id === id) {
            const novaQtd = item.quantidade + delta;
            return novaQtd > 0 ? { ...item, quantidade: novaQtd } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // 3. Cálculos de totais
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalGeral = subtotal > 0 ? subtotal + TAXA_ENTREGA : 0;

  // 4. Finalizar Pedido
  const handleFinalizarPedido = (dadosCheckout) => {
    alert('Pedido efetuado com sucesso!');
    setCarrinho([]);
    setEcraAtual('T1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* TELA 1: Cardápio */}
      {ecraAtual === 'T1' && (
        <Cardapio
          onAdicionarItem={handleAdicionarItem}
          totalItens={totalItens}
          onAbrirCarrinho={() => setEcraAtual('T2')}
        />
      )}

      {/* TELA 2: Carrinho */}
      {ecraAtual === 'T2' && (
        <Carrinho
          carrinho={carrinho}
          onAlterarQtd={handleAlterarQtd}
          subtotal={subtotal}
          taxaEntrega={TAXA_ENTREGA}
          totalGeral={totalGeral}
          onVoltar={() => setEcraAtual('T1')}
          onContinuar={() => setEcraAtual('T3')}
        />
      )}

      {/* TELA 3: Checkout */}
      {ecraAtual === 'T3' && (
        <Checkout
          totalItens={totalItens}
          onVoltar={() => setEcraAtual('T2')}
          onFinalizar={handleFinalizarPedido}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});