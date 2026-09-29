import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export default function ConfirmacaoScreen({ route, navigation }) {
  // Recebe os dados passados pelas telas anteriores via parâmetros da rota
  const {
    itens = [
      { id: '1', nome: 'X-Burger', quantidade: 2 },
      { id: '2', nome: 'X-Salada', quantidade: 1 },
    ],
    total = 83.70,
    endereco = 'Rua A, 123',
    formaPagamento = 'Cartão',
    onResetPedido
  } = route?.params || {};

  // RF17: Gerar número de pedido aleatório único (ex: #4821)
  const numeroPedido = useMemo(() => {
    return Math.floor(1000 + Math.random() * 9000);
  }, []);

  const handleNovoPedido = () => {
    if (onResetPedido) {
      onResetPedido();
    }
    navigation?.navigate('Cardapio');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.conteudo}>
          
          {/* Ícone de Sucesso Visual */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconCheck}>✓</Text>
          </View>

          {/* Mensagem de Sucesso e Número do Pedido */}
          <Text style={styles.titulo}>Pedido confirmado!</Text>
          <Text style={styles.numeroPedido}>Pedido #{numeroPedido}</Text>

          <View style={styles.divider} />

          {/* Resumo dos Itens e Quantidades */}
          <View style={styles.secaoItens}>
            {itens.map((item, index) => (
              <Text key={item.id || index} style={styles.itemTexto}>
                {item.quantidade}x {item.nome}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Total, Endereço e Forma de Pagamento */}
          <View style={styles.linhaTotal}>
            <Text style={styles.labelTotal}>Total pago</Text>
            <Text style={styles.valorTotal}>
              R$ {total.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View style={styles.detalhesEntrega}>
            <Text style={styles.textoDetalhe}>Entrega: {endereco}</Text>
            <Text style={styles.textoDetalhe}>Pagamento: {formaPagamento}</Text>
          </View>

          {/* Botão de Ação */}
          <TouchableOpacity
            style={styles.botaoNovoPedido}
            activeOpacity={0.8}
            onPress={handleNovoPedido}
          >
            <Text style={styles.textoBotao}>Fazer novo pedido</Text>
          </TouchableOpacity>

        </View>

        {/* Identificador de Tela igual às outras telas */}
        <Text style={styles.rodapeIdentificador}>T4 · Confirmação</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 16,
  },
  conteudo: {
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  iconCheck: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d2a44',
    marginBottom: 4,
  },
  numeroPedido: {
    fontSize: 16,
    color: '#5b7fff',
    fontWeight: '600',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eef2f5',
    marginVertical: 12,
  },
  secaoItens: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  itemTexto: {
    fontSize: 15,
    color: '#333333',
    marginVertical: 3,
    fontWeight: '500',
  },
  linhaTotal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d2a44',
  },
  valorTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  detalhesEntrega: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  textoDetalhe: {
    fontSize: 14,
    color: '#666666',
    marginTop: 3,
  },
  botaoNovoPedido: {
    width: '100%',
    minHeight: 48,
    backgroundColor: '#2ecc71',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rodapeIdentificador: {
    textAlign: 'center',
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 8,
  },
});