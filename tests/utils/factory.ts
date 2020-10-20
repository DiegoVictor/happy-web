import factory from 'factory-girl';
import faker from 'faker';

factory.define(
  'Orphanage',
  {},
  {
    id: () => String(faker.random.number()),
    name: faker.name.title,
    about: faker.lorem.sentence,
    latitude: faker.address.latitude,
    longitude: faker.address.longitude,
    instructions: faker.lorem.sentence,
    opening_hours: faker.lorem.sentence,
    open_on_weekends: faker.random.boolean,
    whatsapp: faker.phone.phoneNumber,
    images: [
      {
        id: faker.random.number,
        path: faker.image.imageUrl,
      },
      {
        id: faker.random.number,
        path: faker.image.imageUrl,
      },
    ],
  },
);

export default factory;
