using Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Respository
{
    public class RatingRepository : IRatingRepository
    {
        public string _connectionString { get; set; }
        public RatingRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Home");
        }
        public async Task saveRating(Rating rating)
        {
            string query = "INSERT INTO [dbo].[RATING] ([USER_ID],[HOST] ,[METHOD],[PATH],[REFERER],[USER_AGENT],[RECORD_DATE])"
            + "VALUES(@UserId, @Host, @Method, @Path, @Referer, @UserAgent,@RecordDate)";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand sqlCommand = new SqlCommand(query, connection))
            {
                sqlCommand.Parameters.Add("@UserId", SqlDbType.Int).Value = rating.UserId;
                sqlCommand.Parameters.Add("@Host", SqlDbType.VarChar, 50).Value = rating.Host;
                sqlCommand.Parameters.Add("@Method", SqlDbType.VarChar, 10).Value = rating.Method;
                sqlCommand.Parameters.Add("@Path", SqlDbType.VarChar, 50).Value = rating.Path;
                sqlCommand.Parameters.Add("@Referer", SqlDbType.NVarChar, 100).Value = rating.Referer;
                sqlCommand.Parameters.Add("@UserAgent", SqlDbType.NVarChar,int.MaxValue).Value = rating.UserAgent;
                sqlCommand.Parameters.Add("@RecordDate", SqlDbType.DateTime).Value = rating.RecordoDate;

                await connection.OpenAsync();
                int rowsAffected = await sqlCommand.ExecuteNonQueryAsync();
                await connection.CloseAsync();
            }
        }
    }
}
