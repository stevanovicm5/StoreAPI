
namespace DataAccessLayer.Exceptions;

public class InvalidFieldValueException : Exception
{
    public InvalidFieldValueException(){}

    public InvalidFieldValueException(string message) 
        : base(message) { }

    public InvalidFieldValueException(string message, Exception inner) 
        : base(message, inner) { }
}
