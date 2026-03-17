using DataAccessLayer.Exceptions;

namespace StoreAPI.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            if (context.Response.HasStarted)
            {
                _logger.LogError(ex, "Exception occurred after response has started.");
                throw;
            }

            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        switch (ex)
        {
            case AppException appEx:
                context.Response.StatusCode = appEx.StatusCode;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = appEx.Message,
                    statusCode = appEx.StatusCode
                });
                break;

            default:
                _logger.LogError(ex, "An unexpected error occurred.");
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = "An unexpected error occurred.",
                    statusCode = 500
                });
                break;
        }
    }
}
