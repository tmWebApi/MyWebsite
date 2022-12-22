﻿using Entities;

namespace Service
{
    public interface IUserService
    {
        public Task<User?> getUser(string userName, string password);
        Task<User> createUser(User user);
        void updateUser(int id, User updateUser);
        void deleteUser(int id);

    }
}