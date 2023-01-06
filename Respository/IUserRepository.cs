using Entities;

namespace Respository
{
    public interface IUserRepository
    {
        public Task<User?> getUser(string userName, string password);
        Task<User> createUser(User user);
        
        Task updateUser(int id, User updateUser);
        Task deleteUser(int id);
    }
}