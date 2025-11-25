import factory from 'factory-girl';
import { faker } from '@faker-js/faker';

factory.define(
  'Orphanage',
  {},
  {
    id: () => faker.number.int().toString(),
    name: faker.company.name,
    about: faker.lorem.sentence,
    latitude: faker.location.latitude,
    longitude: faker.location.longitude,
    instructions: faker.lorem.sentence,
    opening_hours: faker.lorem.sentence,
    open_on_weekends: faker.datatype.boolean,
    whatsapp: faker.phone.number,
    images: [
      {
        id: faker.number.int(),
        path: faker.image.url,
      },
      {
        id: faker.number.int,
        path: faker.image.url,
      },
    ],
  },
);

export default factory;
