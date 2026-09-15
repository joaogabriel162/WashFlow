<!--
  Painel da Fila -- Modulo de Gestao de Fila.

  Mostra a ordem de chegada, o status de cada veiculo e a previsao de
  conclusao calculada pelo backend. Recarrega sozinho a cada 15s para que
  o painel do balcao reflita o patio sem ninguem precisar atualizar a tela.
-->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { avancarStatus, consultarFila } from '../services/washflowService';

const ROTULO_STATUS = {
  AGUARDANDO: 'Aguardando',
  EM_LAVAGEM: 'Em lavagem',
  SECAGEM: 'Secagem',
};

const PROXIMA_ACAO = {
  AGUARDANDO: 'Iniciar lavagem',
  EM_LAVAGEM: 'Iniciar secagem',
  SECAGEM: 'Finalizar',
};

const fila = ref([]);
const erro = ref('');
const carregando = ref(true);
let temporizador = null;

async function carregar() {
  try {
    fila.value = await consultarFila();
    erro.value = '';
  } catch (e) {
    erro.value = e.message;
  } finally {
    carregando.value = false;
  }
}

async function avancar(id) {
  try {
    await avancarStatus(id);
    await carregar();
  } catch (e) {
    erro.value = e.message;
  }
}

onMounted(() => {
  carregar();
  temporizador = setInterval(carregar, 15000);
});

// Sem isso o intervalo continuaria rodando depois de sair da tela.
onUnmounted(() => clearInterval(temporizador));
</script>

<template>
  <div class="cartao">
    <h2>Fila do patio</h2>

    <p v-if="erro" class="aviso erro">{{ erro }}</p>

    <p v-if="carregando" class="vazio">Carregando...</p>
    <p v-else-if="fila.length === 0" class="vazio">
      Nenhum veiculo no patio no momento.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Veiculo</th>
          <th>Cliente</th>
          <th>Servico</th>
          <th>Status</th>
          <th>Pronto em</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fila" :key="item.id">
          <td>{{ item.posicao }}</td>
          <td>
            <strong>{{ item.placa }}</strong>
            <br />
            {{ item.modelo }}{{ item.cor ? ` - ${item.cor}` : '' }}
          </td>
          <td>
            {{ item.cliente?.nome }}
            <br />
            {{ item.cliente?.telefone }}
          </td>
          <td>{{ item.servico.nome }}</td>
          <td>
            <span class="etiqueta" :class="item.status">
              {{ ROTULO_STATUS[item.status] }}
            </span>
          </td>
          <td>~{{ item.tempoEsperaEstimadoMinutos }} min</td>
          <td>
            <button class="avancar" @click="avancar(item.id)">
              {{ PROXIMA_ACAO[item.status] }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
