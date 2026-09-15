<!--
  Tela de Login -- porta de entrada do sistema (RNF04 - Seguranca).
-->
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { entrar } from '../services/washflowService';

const router = useRouter();

const form = reactive({ login: '', senha: '' });
const erro = ref('');
const enviando = ref(false);

async function submeter() {
  erro.value = '';
  enviando.value = true;

  try {
    await entrar(form.login, form.senha);
    router.push({ name: 'fila' });
  } catch (e) {
    erro.value = e.message;
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <div class="login-tela">
    <form class="cartao login-caixa" @submit.prevent="submeter">
      <h2>WashFlow</h2>

      <p v-if="erro" class="aviso erro">{{ erro }}</p>

      <div class="campo">
        <label for="login">Usuario</label>
        <input id="login" v-model="form.login" autofocus />
      </div>

      <div class="campo">
        <label for="senha">Senha</label>
        <input id="senha" v-model="form.senha" type="password" />
      </div>

      <button class="primario" type="submit" :disabled="enviando">
        {{ enviando ? 'Entrando...' : 'Entrar' }}
      </button>

      <p class="login-dica">
        Usuarios de demonstracao:
        <br />
        recepcao / recepcao123 &middot; gerente / gerente123
      </p>
    </form>
  </div>
</template>
