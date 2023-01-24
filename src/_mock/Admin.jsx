import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------


const admins = [...Array(7)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    handleTrans: faker.finance.amount(100000, 1000000, 0, 'Rp', true),
    // lastLogin: sample(['2023-01-20', '2023-01-21', '2023-01-22', '2023-01-24']),
    lastLogin: faker.date.past().toLocaleDateString('id-ID'),
    status: sample(['active', 'banned']),
    role: sample(['Super Admin', 'Admin']),
}));

export default admins;
