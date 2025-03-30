import UserModel from '../models/UserModel';
import RunModel from '../models/RunModel';
import sequelize from '../config/sequelize';

const testRelations = async () => {
  try {
    console.log('Testing relations 23...');
    // get user with associated runs
    const user = await UserModel.findOne({
      where: { id: 1 },
      include: [{ model: RunModel, as: 'runs', required: false }],
    });
    if (user) {
      console.log('User found:', user.toJSON());

    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error while testing relations:', error);
  }
};
    

sequelize.authenticate().then(() => {
  testRelations();
});

