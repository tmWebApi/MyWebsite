using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Respository
{
    public class UserRepository : IUserRepository
    {
        private readonly ShoppingWebsiteContext _dbContext;
        public UserRepository(ShoppingWebsiteContext salesWebsiteContext)
        {
            _dbContext = salesWebsiteContext;
        }
        public async Task<User?> getUser(string userName, string password)
        {
            var query = _dbContext.Users.Where(user => user.UserName == userName && user.Password == password);
            var user = await query.ToArrayAsync();
            //var users = await (from user in _dbContext.Users
            //                   where user.UserName == userName && user.Password == password
            //                   select user).ToListAsync();
            return user.FirstOrDefault();
        }

        public async Task<User> createUser(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public void updateUser(int userId, User updateUser)
        {
            var userToUpdate = _dbContext.Users.Find(userId);
            if (userToUpdate == null)
            {
                return;
            }
            _dbContext.Entry(userToUpdate).CurrentValues.SetValues(updateUser);
            _dbContext.SaveChanges();
        }

        public void deleteUser(int userId)
        {
            var user = _dbContext.Users.Find(userId);
            if (user == null) 
            {
                return;
            }
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();

        }
    }
}
