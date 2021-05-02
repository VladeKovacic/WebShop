using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;

namespace Api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public Task<AppUser> GetUserByUsernameAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(AppUser user)
        {
            throw new System.NotImplementedException();
        }
    }
}