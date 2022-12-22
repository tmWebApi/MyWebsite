
//using Entities;
using Entities;
using Respository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repositoryUser;
        public UserService(IUserRepository repositoryUser)
        {
            _repositoryUser = repositoryUser;
        }
        public async Task<User?> getUser(string userName, string password)
        {
            User? user = await _repositoryUser.getUser(userName, password);
            return user;
        }
        public async Task<User> createUser(User user)
        {
            User newUser = await _repositoryUser.createUser(user);
            return newUser;
        }

        public void updateUser(int id, User updateUser)
        {
            _repositoryUser.updateUser(id, updateUser);
        }
        public void deleteUser(int id)
        {
            _repositoryUser.deleteUser(id);
        }


    }
}
