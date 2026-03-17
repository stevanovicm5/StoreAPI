namespace DataAccessLayer.Models;

public class RefreshToken
{
    public Guid Id { get; set; }
    public string TokenHash { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
