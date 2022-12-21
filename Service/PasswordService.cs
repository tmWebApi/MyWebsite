using Zxcvbn;

namespace Service
{
    public class PasswordService : IPasswordService
    {
        public int checkPassword(string password)
        {
            Result result = Zxcvbn.Core.EvaluatePassword(password);
            return result.Score;
        }
    }
}
