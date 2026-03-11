using DataAccessLayer.Enumerations;
using DataAccessLayer.Exceptions;

namespace DataAccessLayer.Models
{
    public class User
    {
        public int Id { get; private set; }
        private string _name  = string.Empty;

        public string Name
        {
            get => _name;
            set 
            { 
                if (string.IsNullOrEmpty(value))
                {
                    throw new InvalidFieldValueException("Name cannot be null or empty.");
                }
                _name = value; 
            }
        }
        private string _email = string.Empty;
        public string Email
        {
            get => _email;
            set 
            { 
                if (string.IsNullOrEmpty(value))
                {
                    throw new InvalidFieldValueException("Email cannot be null or empty.");
                }
                _email = value; 
            }
        }
        private string _password = string.Empty;
        public string Password
        {
            get => _password;
            set 
            { 
                if (string.IsNullOrEmpty(value))
                {
                    throw new InvalidFieldValueException("Password cannot be null or empty.");
                }
                _password = value; 
            }
        }

        public Role Role { get; set; }
    }
}