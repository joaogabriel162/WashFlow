/**
 * Camada de configuracao -- conexao unica com o banco.
 *
 * O C4 Nivel 2 documenta PostgreSQL como banco do sistema. Para que o
 * projeto rode sem exigir a instalacao do Postgres, o dialeto e escolhido
 * por variavel de ambiente: sqlite em desenvolvimento, postgres no alvo
 * documentado. O restante da aplicacao nao percebe a diferenca.
 */
const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';

const opcoesComuns = {
  dialect,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};

const sequelize =
  dialect === 'sqlite'
    ? new Sequelize({
        ...opcoesComuns,
        storage: process.env.DB_STORAGE || 'washflow.sqlite',
      })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          ...opcoesComuns,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
        }
      );

module.exports = sequelize;
