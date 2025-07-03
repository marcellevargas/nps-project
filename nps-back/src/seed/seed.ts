import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NpsSurvey } from '../modules/nps-survey/schemas/nps-survey.schema';

interface ProductStats {
  _id: string;
  totalRatings: number;
  averageRating: number;
  maxRating: number;
  minRating: number;
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const npsSurveyModel = app.get<Model<NpsSurvey>>(
    getModelToken(NpsSurvey.name),
  );

  await npsSurveyModel.deleteMany({});

  const testData = [
    {
      productName: 'Pizza Express',
      rating: 5,
      comment: 'Pizza deliciosa e chegou quentinha! Adorei a massa fina.',
      createdAt: new Date('2024-01-15'),
    },
    {
      productName: 'Pizza Express',
      rating: 4,
      comment: 'Muito boa, mas poderia ter mais opções de borda.',
      createdAt: new Date('2024-01-16'),
    },
    {
      productName: 'Pizza Express',
      rating: 3,
      comment: 'Razoável, mas demorou mais que o esperado.',
      createdAt: new Date('2024-01-17'),
    },
    {
      productName: 'Burger King',
      rating: 5,
      comment: 'Hambúrguer perfeito! Carne suculenta e pão macio.',
      createdAt: new Date('2024-01-18'),
    },
    {
      productName: 'Burger King',
      rating: 4,
      comment: 'Muito bom, mas as batatas poderiam estar mais crocantes.',
      createdAt: new Date('2024-01-19'),
    },
    {
      productName: 'Burger King',
      rating: 2,
      comment: 'Hambúrguer chegou frio e meio sem graça.',
      createdAt: new Date('2024-01-20'),
    },
    {
      productName: 'Sushi House',
      rating: 5,
      comment: 'Sushi fresco e de excelente qualidade! Recomendo.',
      createdAt: new Date('2024-01-21'),
    },
    {
      productName: 'Sushi House',
      rating: 4,
      comment: 'Bom sushi, mas poderia ter mais variedade no combo.',
      createdAt: new Date('2024-01-22'),
    },
    {
      productName: 'Sushi House',
      rating: 3,
      comment: 'Ok, mas achei meio caro para o que oferece.',
      createdAt: new Date('2024-01-23'),
    },
    {
      productName: 'Sushi House',
      rating: 1,
      comment: 'Péssimo! Peixe com gosto estranho, não recomendo.',
      createdAt: new Date('2024-01-24'),
    },
    {
      productName: 'Padaria Doce Manhã',
      rating: 5,
      comment: 'Pães fresquinhos e doces maravilhosos! Atendimento excelente.',
      createdAt: new Date('2024-01-25'),
    },
    {
      productName: 'Padaria Doce Manhã',
      rating: 4,
      comment: 'Boa padaria, mas poderia ter mais opções de pães integrais.',
      createdAt: new Date('2024-01-26'),
    },
    {
      productName: 'Padaria Doce Manhã',
      rating: 3,
      comment: 'Razoável, mas os preços estão meio altos.',
      createdAt: new Date('2024-01-27'),
    },
    {
      productName: 'Açaí da Praia',
      rating: 5,
      comment: 'Açaí cremoso e saboroso! Muitas opções de acompanhamentos.',
      createdAt: new Date('2024-01-28'),
    },
    {
      productName: 'Açaí da Praia',
      rating: 4,
      comment: 'Bom açaí, mas poderia ter granola mais crocante.',
      createdAt: new Date('2024-01-29'),
    },
    {
      productName: 'Açaí da Praia',
      rating: 2,
      comment: 'Açaí meio aguado e poucas opções de cobertura.',
      createdAt: new Date('2024-01-30'),
    },
    {
      productName: 'Churrascaria Gaúcha',
      rating: 5,
      comment: 'Carnes maravilhosas e buffet completo! Vale cada centavo.',
      createdAt: new Date('2024-02-01'),
    },
    {
      productName: 'Churrascaria Gaúcha',
      rating: 4,
      comment: 'Boa churrascaria, mas poderia ter mais opções de saladas.',
      createdAt: new Date('2024-02-02'),
    },
    {
      productName: 'Churrascaria Gaúcha',
      rating: 3,
      comment: 'Ok, mas algumas carnes estavam meio duras.',
      createdAt: new Date('2024-02-03'),
    },
    {
      productName: 'Pizzaria da Esquina',
      rating: 2,
      comment: 'Pizza sem graça e atendimento demorado.',
      createdAt: new Date('2024-02-04'),
    },
  ];

  await npsSurveyModel.insertMany(testData);

  console.log('✅ Dados de teste inseridos com sucesso!');
  console.log(`📊 ${testData.length} avaliações NPS criadas`);

  const stats = await npsSurveyModel.aggregate<ProductStats>([
    {
      $group: {
        _id: '$productName',
        totalRatings: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        maxRating: { $max: '$rating' },
        minRating: { $min: '$rating' },
      },
    },
  ]);

  console.log('\n📈 Estatísticas por produto:');
  stats.forEach((stat) => {
    console.log(
      `${stat._id}: ${stat.totalRatings} avaliações, média: ${stat.averageRating.toFixed(1)}`,
    );
  });

  await app.close();
}

seed()
  .then(() => {
    console.log('🎉 Seed executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  });
