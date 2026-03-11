using DataAccessLayer.Exceptions;

namespace DataAccessLayer.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string _name = string.Empty;
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
        public float _price = 0;
        public float Price
        {
            get => _price;
            set
            {
                if (value < 0)
                {
                    throw new InvalidFieldValueException("Price cannot be negative.");
                }
                _price = value;
            }
        }
    }
}