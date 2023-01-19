using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.Threading.Tasks;

namespace MyWebsite.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class NotFoundMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<NotFoundMiddleware> _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public NotFoundMiddleware(RequestDelegate next,ILogger<NotFoundMiddleware> logger, IWebHostEnvironment hostingEnvironment)
        {
            _next = next;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            await _next(httpContext);
            if (httpContext.Response.StatusCode == StatusCodes.Status404NotFound)
            {
                _logger.LogWarning("404 Not Found: {OriginalPath}", httpContext.Request.Path);
                // set the response status code to 404
                httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                // set the content type to HTML
                httpContext.Response.ContentType = "text/html";
                var fileProvider = new FileExtensionContentTypeProvider();
                string contentType;
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "../wwwroot/404.html");
                if (!fileProvider.TryGetContentType(Path.GetFileName(filePath), out contentType))
                {
                    contentType = "application/octet-stream";
                }
                httpContext.Response.ContentType = contentType;
                // return the HTML file
                await httpContext.Response.SendFileAsync(filePath);
            }

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class NotFoundMiddlewareExtensions
    {
        public static IApplicationBuilder UseNotFoundMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<NotFoundMiddleware>();
        }
    }
}
