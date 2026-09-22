
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function Checkout({
  onVoltar,
  onFinalizar,
  totalItens = 1,
}) {
  // =========================
  // ESTADOS DOS CAMPOS
  // =========================

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');

  const [pagamento, setPagamento] = useState('Cartão');

  // RF13 - Extra
  const [precisoTroco, setPrecisoTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');

  // Erros
  const [erros, setErros] = useState({});

  // =========================
  // FINALIZAR
  // =========================

  const validarEFinalizar = () => {
    const novosErros = {};

    if (totalItens === 0) {
      novosErros.geral = 'Seu carrinho está vazio.';
    }

    if (nome.trim() === '') {
      novosErros.nome = 'Informe seu nome.';
    }

    if (telefone.length < 10) {
      novosErros.telefone = 'Telefone inválido.';
    }

    if (cep.length !== 8) {
      novosErros.cep = 'CEP deve ter 8 dígitos.';
    }

    if (endereco.trim() === '') {
      novosErros.endereco = 'Informe o endereço.';
    }

    if (!/^[0-9]+$/.test(numero)) {
      novosErros.numero = 'Número inválido.';
    }

    if (!pagamento) {
      novosErros.pagamento =
        'Escolha a forma de pagamento.';
    }

    setErros(novosErros);

    // Se não tiver nenhum erro
    if (Object.keys(novosErros).length === 0) {
      onFinalizar({
        cliente: {
          nome,
          telefone,
          cep,
          endereco,
          numero,
          complemento,
          referencia,
        },

        pagamento,

        trocoInfo:
          pagamento === 'Dinheiro' && precisoTroco
            ? trocoPara
            : null,
      });
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* CABEÇALHO */}

        <TouchableOpacity
          style={styles.headerBanner}
          onPress={onVoltar}
          activeOpacity={0.8}
        >
          <Text style={styles.headerTexto}>
            ← Dados de Entrega
          </Text>
        </TouchableOpacity>

        {/* ERRO GERAL */}

        {erros.geral ? (
          <Text style={styles.erroGeralText}>
            ⚠ {erros.geral}
          </Text>
        ) : null}

        {/* NOME */}

        <View style={styles.campoGroup}>
          <Text style={styles.label}>
            Nome
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.nome && styles.inputErro,
            ]}
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);

              if (erros.nome) {
                setErros((anterior) => ({
                  ...anterior,
                  nome: null,
                }));
              }
            }}
            placeholder="Digite seu nome"
            keyboardType="default"
            autoCapitalize="words"
          />

          {erros.nome ? (
            <Text style={styles.erroText}>
              ⚠ {erros.nome}
            </Text>
          ) : null}
        </View>

        {/* TELEFONE */}

        <View style={styles.campoGroup}>
          <Text style={styles.label}>
            Telefone
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.telefone && styles.inputErro,
            ]}
            value={telefone}
            onChangeText={(texto) => {
              setTelefone(texto);

              if (erros.telefone) {
                setErros((anterior) => ({
                  ...anterior,
                  telefone: null,
                }));
              }
            }}
            placeholder="(19) 99999-9999"
            keyboardType="phone-pad"
          />

          {erros.telefone ? (
            <Text style={styles.erroText}>
              ⚠ {erros.telefone}
            </Text>
          ) : null}
        </View>

        {/* CEP */}

        <View style={styles.campoGroup}>
          <Text style={styles.label}>
            CEP
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.cep && styles.inputErro,
            ]}
            value={cep}
            onChangeText={(texto) => {
              setCep(texto);

              if (erros.cep) {
                setErros((anterior) => ({
                  ...anterior,
                  cep: null,
                }));
              }
            }}
            placeholder="13010000"
            keyboardType="numeric"
            maxLength={8}
          />

          {erros.cep ? (
            <Text style={styles.erroText}>
              ⚠ {erros.cep}
            </Text>
          ) : null}
        </View>

        {/* ENDEREÇO */}

        <View style={styles.campoGroup}>
          <Text style={styles.label}>
            Endereço
          </Text>

          <TextInput
            style={[
              styles.input,
              erros.endereco && styles.inputErro,
            ]}
            value={endereco}
            onChangeText={(texto) => {
              setEndereco(texto);

              if (erros.endereco) {
                setErros((anterior) => ({
                  ...anterior,
                  endereco: null,
                }));
              }
            }}
            placeholder="Rua, Avenida..."
            keyboardType="default"
            autoCapitalize="sentences"
          />

          {erros.endereco ? (
            <Text style={styles.erroText}>
              ⚠ {erros.endereco}
            </Text>
          ) : null}
        </View>

        {/* NÚMERO + COMPLEMENTO */}

        <View style={styles.linhaDupla}>

          <View
            style={[
              styles.campoGroup,
              styles.campoNumero,
            ]}
          >
            <Text style={styles.label}>
              Número
            </Text>

            <TextInput
              style={[
                styles.input,
                erros.numero && styles.inputErro,
              ]}
              value={numero}
              onChangeText={(texto) => {
                setNumero(texto);

                if (erros.numero) {
                  setErros((anterior) => ({
                    ...anterior,
                    numero: null,
                  }));
                }
              }}
              placeholder="123"
              keyboardType="numeric"
            />

            {erros.numero ? (
              <Text style={styles.erroText}>
                ⚠ {erros.numero}
              </Text>
            ) : null}
          </View>

          <View
            style={[
              styles.campoGroup,
              styles.campoComplemento,
            ]}
          >
            <Text style={styles.label}>
              Complemento
            </Text>

            <TextInput
              style={styles.input}
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Apto, bloco..."
              keyboardType="default"
            />
          </View>

        </View>

        {/* REFERÊNCIA */}

        <View style={styles.campoGroup}>
          <Text style={styles.label}>
            Ponto de Referência
          </Text>

          <TextInput
            style={styles.input}
            value={referencia}
            onChangeText={setReferencia}
            placeholder="Ex: perto do mercado"
            keyboardType="default"
          />
        </View>

        {/* PAGAMENTO */}

        <View style={styles.campoGroup}>

          <Text style={styles.label}>
            Forma de pagamento
          </Text>

          <View
            style={[
              styles.pickerContainer,
              erros.pagamento && styles.inputErro,
            ]}
          >

            <Picker
              selectedValue={pagamento}
              onValueChange={(valor) => {
                setPagamento(valor);

                if (erros.pagamento) {
                  setErros((anterior) => ({
                    ...anterior,
                    pagamento: null,
                  }));
                }
              }}
              dropdownIconColor="#3D5AFE"
            >

              <Picker.Item
                label="Cartão"
                value="Cartão"
              />

              <Picker.Item
                label="Pix"
                value="Pix"
              />

              <Picker.Item
                label="Dinheiro"
                value="Dinheiro"
              />

            </Picker>

          </View>

          {erros.pagamento ? (
            <Text style={styles.erroText}>
              ⚠ {erros.pagamento}
            </Text>
          ) : null}

        </View>

        {/* RF13 - TROCO */}

        {pagamento === 'Dinheiro' && (
          <View style={styles.trocoContainer}>

            <View style={styles.switchRow}>

              <Text style={styles.label}>
                Preciso de troco
              </Text>

              <Switch
                value={precisoTroco}
                onValueChange={setPrecisoTroco}
                trackColor={{
                  false: '#D0D7DE',
                  true: '#3D5AFE',
                }}
                thumbColor="#FFFFFF"
              />

            </View>

            {precisoTroco && (
              <TextInput
                style={[
                  styles.input,
                  styles.trocoInput,
                ]}
                value={trocoPara}
                onChangeText={setTrocoPara}
                placeholder="Troco para quanto?"
                keyboardType="numeric"
              />
            )}

          </View>
        )}

        {/* ESPAÇO */}

        <View style={styles.espacador} />

        {/* FINALIZAR */}

        <TouchableOpacity
          style={styles.btnFinalizar}
          onPress={validarEFinalizar}
          activeOpacity={0.8}
        >
          <Text style={styles.btnFinalizarText}>
            Finalizar pedido
          </Text>
        </TouchableOpacity>

        {/* IDENTIFICADOR */}

        <Text style={styles.rodapeIdentificador}>
          T3 · Checkout
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  headerBanner: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  headerTexto: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  campoGroup: {
    marginBottom: 12,
  },

  linhaDupla: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  campoNumero: {
    width: '30%',
  },

  campoComplemento: {
    width: '65%',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 4,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#202A44',
    height: 46,
  },

  inputErro: {
    borderColor: '#EB5757',
    backgroundColor: '#FDF2F2',
    borderWidth: 1.5,
  },

  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 10,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  erroText: {
    color: '#EB5757',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },

  erroGeralText: {
    color: '#EB5757',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  trocoContainer: {
    backgroundColor: '#F2F4F7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  trocoInput: {
    marginTop: 10,
  },

  espacador: {
    flex: 1,
    minHeight: 16,
  },

  btnFinalizar: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  btnFinalizarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  rodapeIdentificador: {
    textAlign: 'center',
    color: '#3D5AFE',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },

});
