
namespace DataAccessLayer.Exceptions;

public class EmailAlreadyExistsException : AppException
{
    public EmailAlreadyExistsException(string email)
        : base($"Email '{email}' is already in use.", 409)
    {

    }
}
