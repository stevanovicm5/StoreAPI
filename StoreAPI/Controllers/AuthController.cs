using BusinessLogicLayer.DTOs.Auth;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto);
            SetRefreshTokenCookie(result.RefreshToken);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var result = await _authService.LoginAsync(dto);
            SetRefreshTokenCookie(result.RefreshToken);
            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"]
                ?? throw new UnauthorizedException("Refresh token not found.");

            var result = await _authService.RefreshTokenAsync(refreshToken);
            SetRefreshTokenCookie(result.RefreshToken);
            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken is not null)
                await _authService.LogoutAsync(refreshToken);

            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
