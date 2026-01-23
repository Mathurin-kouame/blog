import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connexion PostgreSQL OK');
    return AppDataSource.destroy();
  })
  .catch((err) => {
    console.error('❌ Erreur connexion DB', err);
  });
