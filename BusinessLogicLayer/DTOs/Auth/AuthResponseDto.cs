using System.Text.Json.Serialization;

namespace BusinessLogicLayer.DTOs.Auth;

public class AuthResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public UserInfoDto User { get; set; } = null!;

    [JsonIgnore]
    public string RefreshToken { get; set; } = string.Empty;
}