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
        private ShoppingWebsiteContext dbContext;
        public UserRepository(ShoppingWebsiteContext salesWebsiteContext)
        {
            dbContext = salesWebsiteContext;
        }
        public async Task<User> getUser(string userName, string password)
        {
            var users = await (from user in dbContext.Users
                                   where user.UserName == userName && user.Password == password 
                                   select user).ToListAsync();

            return users.FirstOrDefault();
        }

        public async Task<User> createUser(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async void updateUser(int userId, User updateUser)
        {
            var userToUpdate = await dbContext.Users.FindAsync(userId);
            if (userToUpdate == null) 
            { 
                return; 
            }
            dbContext.Entry(userToUpdate).CurrentValues.SetValues(updateUser);
            await dbContext.SaveChangesAsync();
        }
    }
}
