const bcrypt = require('bcrypt');
const shopModel = require('../models/shop.model');

describe('signUp', () => {
  it('should return code "exits_email" if shop email already exists', async () => {
    const mockEmail = 'test@example.com';
    jest.spyOn(shopModel, 'findOne').mockResolvedValueOnce({ email: mockEmail });

    const result = await signUp({ name: 'Test Shop', email: mockEmail, password: 'password' });

    expect(result).toEqual({
      code: 'exits_email',
      message: 'Shop email already exists!'
    });
  });

  it('should create a new shop with hashed password and return no error', async () => {
    const mockEmail = 'test@example.com';
    jest.spyOn(shopModel, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(shopModel, 'create').mockResolvedValueOnce({});

    const result = await signUp({ name: 'Test Shop', email: mockEmail, password: 'password' });

    expect(result).toBeUndefined();
    expect(shopModel.create).toHaveBeenCalledWith({
      name: 'Test Shop',
      email: mockEmail,
      password: expect.any(String),
      roles: ['ADMIN']
    });
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
  });

  it('should return code "error_signup" if an error occurs during signup', async () => {
    const mockEmail = 'test@example.com';
    jest.spyOn(shopModel, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(shopModel, 'create').mockRejectedValueOnce(new Error('Database error'));

    const result = await signUp({ name: 'Test Shop', email: mockEmail, password: 'password' });

    expect(result).toEqual({
      code: 'error_signup',
      message: 'Database error'
    });
  });
});