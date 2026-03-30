using BusinessLogicLayer.DTOs.User;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user is null) return NotFound();
            return Ok(user);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto userDto)
        {
            try
            {
                var user = await _userService.CreateAsync(userDto);
                return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
            }
            catch (InvalidFieldValueException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _userService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserDto updateUserDto)
        {
            try
            {
                var user = await _userService.UpdateAsync(id, updateUserDto);
                if (user is null) return NotFound();
                return Ok(user);
            }
            catch (InvalidFieldValueException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpPatch("{id}/change-password")]
        public async Task<IActionResult> ChangePassword(Guid id, ChangePasswordDto changePasswordDto)
        {
            await _userService.ChangePasswordAsync(id, changePasswordDto);
            return NoContent();
        }
    }
}
