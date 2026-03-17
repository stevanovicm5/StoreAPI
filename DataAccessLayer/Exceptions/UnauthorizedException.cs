namespace DataAccessLayer.Exceptions;

public class UnauthorizedException : AppException
{
    public UnauthorizedException(string message = "Unauthorized.")
        : base(message, 401)
    {
    }
}