import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image 
} from 'react-native';

const PRODUTOS = [
  {
    id: '1',
    nome: 'X-Burger',
    descricao: 'Pão, carne, queijo',
    preco: 24.90,
    imagem: require('../../assets/xburguer.png'),
  },
  {
    id: '2',
    nome: 'X-Salada',
    descricao: 'Alface, tomate, queijo',
    preco: 27.90,
    imagem: require('../../assets/xsalada.png'),
  },
  {
    id: '3',
    nome: 'X-Bacon',
    descricao: 'Bacon crocante e queijo',
    preco: 29.90,
    imagem: require('../../assets/xbacon.png'),
  },
  {
    id: '4',
    nome: 'X-Especial',
    descricao: 'Duplo hambúrguer e queijo',
    preco: 34.90,
    imagem: require('../../assets/xespecial.png'),
  },
  {
    id: '5',
    nome: 'Refrigerante',
    descricao: 'Lata 350ml gelada',
    preco: 6.00,
    imagem: require('../../assets/refri.png'),
  },
];

export default function Cardapio({ onAdicionarItem, totalItens = 0, onAbrirCarrinho }) {
  const [busca, setBusca] = useState('');

  const produtosFiltrados = PRODUTOS.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>DelivExpress</Text>
        <TouchableOpacity style={styles.badge} onPress={onAbrirCarrinho}>
          <Text style={styles.badgeTexto}>{totalItens}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buscaContainer}>
        <TextInput 
          style={styles.buscaInput}
          placeholder="🔍 Buscar lanche..."
          placeholderTextColor="#A0AAB8"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
        {produtosFiltrados.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.imagem} style={styles.imagem} resizeMode="cover" />
            
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              
              <View style={styles.linhaPrecoBotao}>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
                
                <TouchableOpacity 
                  style={styles.botaoAdd} 
                  onPress={() => onAdicionarItem && onAdicionarItem(item)}
                >
                  <Text style={styles.textoBotao}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.rodape}>T1 · Cardápio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#3D5AFE',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#2EC478',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buscaContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  buscaInput: {
    backgroundColor: '#F7F9FC',
    borderColor: '#D0D7DE',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#202A44',
  },
  lista: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#F2F4F7',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: 'center',
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A2536',
  },
  descricao: {
    fontSize: 13,
    color: '#606F7B',
    marginTop: 2,
    marginBottom: 6,
  },
  linhaPrecoBotao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EB5757',
  },
  botaoAdd: {
    backgroundColor: '#2EC478',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  rodape: {
    textAlign: 'center',
    color: '#3D5AFE',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 12,
  },
});