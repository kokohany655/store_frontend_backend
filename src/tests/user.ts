import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = 'test';
import UserModel from '../models/user';
import db from '../database/database';



describe('User Model methods definition', () => {
  it('Should have an INDEX method', () => {
    expect(UserModel.getAll).toBeDefined();
  });

  it('Should have a SHOW method', () => {
    expect(UserModel.getById).toBeDefined();
  });

  it('Should have a CREATE method', () => {
    expect(UserModel.create).toBeDefined();
  });

  it('Should have a UPDATE method', () => {
    expect(UserModel.update).toBeDefined();
  });

  it('Should have a DELETE method', () => {
    expect(UserModel.delete).toBeDefined();
  });

  it('Should have an AUTHENTICATE method', () => {
    expect(UserModel.authenticate).toBeDefined();
  });
});


describe('User Model methods', () => {
  
  it('Should create a user', async () => {
    const user = await UserModel.create({
      id: 1,
      first_name: 'krkr',
      last_name: 'sameh',
      email: 'any',
      password: "1125652"
    });
    expect(user.first_name).toBe('krkr');
  })
  it('Should return all users', async () => {
    const users = await UserModel.getAll();
    expect(users.length).toBe(1);
  })
  
  it('Should return a user by id', async () => {
    const user = await UserModel.getById(1);
    expect(user.id).toBe(1);
  })
  it('Should update a user', async () => {
    const user = await UserModel.update(1, {
      id: 1,
      first_name: 'mina',
      last_name: 'hany',
      email: 'any@',
      password: "12345"
    });
    expect(user.email).toBe('any@');
  }
  )
  it('Should authenticate a user', async () => {
    const user = await UserModel.authenticate('any@', '12345');
    expect(user.email).toBe('any@');
  }
  )
  it('Should delete a user', async () => {
    const user = await UserModel.delete(1);
    expect(user.id).toBe(1);
  })

})

