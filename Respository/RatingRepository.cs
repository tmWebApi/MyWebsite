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
    public class RatingRepository
    {
        public string _connectionString { get; set; }
        public RatingRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("School");
        }
        public async Task createRating(Rating rating)
        {
            int? UserId = rating.UserId;
            string? Host = rating.Host;
            string? Method = rating.Method;
            string? Path = rating.Path;
            string? Referer = rating.Referer;
            string? UserAgent = rating.UserAgent;
            // define INSERT query with parameters
            string query = "INSERT INTO [dbo].[RATING] ([USER_ID],[HOST] ,[METHOD],[PATH],[REFERER],[USER_AGENT],[RECORD_DATE])"
            + "(@UserId, @Host, @Method, @Path, @Referer, @UserAgent)";

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand sqlCommand = new SqlCommand(query, connection))
            {
                // define parameters and their values
                sqlCommand.Parameters.Add("@UserId", SqlDbType.Int).Value = rating.UserId;
                sqlCommand.Parameters.Add("@Host", SqlDbType.VarChar, 50).Value = rating.Host;
                sqlCommand.Parameters.Add("@Method", SqlDbType.Int, 10).Value = rating.Method;
                sqlCommand.Parameters.Add("@Path", SqlDbType.Int, 50).Value = rating.Path;
                sqlCommand.Parameters.Add("@Referer", SqlDbType.NVarChar, 100).Value = rating.Referer;
                sqlCommand.Parameters.Add("@UserAgent", SqlDbType.NVarChar, int.MaxValue).Value = rating.UserAgent;
                // open connection, execute INSERT, close connection
                connection.Open();
                int rowsAffected = sqlCommand.ExecuteNonQuery();
                connection.Close();
            }
        }
    }
}
